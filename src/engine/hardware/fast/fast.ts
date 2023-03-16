import Hardware, { HardwareRequest, HardwareResponse } from '@/engine/entities/Hardware';
import { filterUndefined } from '@/lib/array/array';
import { bitTest, clamp } from '@/lib/math/math';

// These will need to be adjusted if FAST changes these.
const usbVendorId = 11914;
const usbProductId = 4155;
const hardwareModel = 8192;

export const requestPort = async () => {
	const ports = await navigator.serial.getPorts();
	for (const port of ports) {
		await port.forget();
	}
	await navigator.serial.requestPort({ filters: [{ usbVendorId, usbProductId }] });
};

const fast: Hardware = async (args: HardwareRequest): Promise<HardwareResponse> => {
	const { onButtonChange, maxButtonId } = args;

	return new Promise((resolve) => {
		(async () => {
			const ports = await navigator.serial.getPorts();
			if (ports.length !== 1) {
				throw new Error(`Port count ${ports.length} not 1`);
			}

			const port = ports[0];
			await port.open({ baudRate: 921600 });

			const writer = port.writable.getWriter();

			// Zero padding and uppercase doesn't seem to be needed,
			//  but it makes things match the docs and maybe easier to read in logs.
			const toHex = (number: number) => {
				const hex = number.toString(16).toUpperCase();
				if (hex.length % 2) {
					return '0' + hex;
				}
				return hex;
			};

			const percentToByteValue = (value: number) => Math.round(clamp({ value, min: 0, max: 1 }) * 255);

			const writeLine = async (args: { text: string }) => {
				const { text } = args;
				if (!text.startsWith('WD:')) {
					console.log('write', text);
				}
				await writer.write(new TextEncoder().encode(text + '\r'));
			};

			const writeCommand = async (command: string, ...args: Array<number | undefined>) => {
				const text = `${command}:${filterUndefined(args)
					.map((arg) => toHex(arg))
					.join(',')}`;
				await writeLine({ text });
			};

			const clear = async () => {
				await writeLine({ text: Array(2048).fill(' ').join('') });
			};

			const configureHardware = async () => {
				await writeCommand('CH', hardwareModel, 1);
			};

			const getButtonStates = async () => {
				await writeCommand('SA');
			};

			const setWatchdog = async (args: { timeoutInMilliseconds: number }) => {
				const { timeoutInMilliseconds } = args;
				await writeCommand('WD', timeoutInMilliseconds);
			};

			const triggerFlags = {
				enable: 0b1,
				notUsed1: 0b10,
				notUsed2: 0b100,
				oneShot: 0b1000,
				invertButtonOne: 0b10000,
				invertButtonTwo: 0b100000,
				manual: 0b1000000,
				disableButton: 0b10000000,
			};
			const modes = {
				pulse: 0x10,
				pulseAndHold: 0x18,
				pulseWithCancelButton: 0x75,
			};

			const configureAutoTriggeredDiverter = async (args: {
				coilId: number;
				enterButtonId: number;
				exitButtonId: number;
				trigger: { enterButtonCondition: boolean; exitButtonCondition: boolean };
				fullPowerTimeInMilliseconds: number;
				partialPowerTimeInDeciseconds: number;
				partialPowerPercent: number;
				restTimeInMilliseconds: number;
			}) => {
				const {
					coilId,
					enterButtonId,
					exitButtonId,
					trigger,
					fullPowerTimeInMilliseconds,
					partialPowerTimeInDeciseconds,
					partialPowerPercent,
					restTimeInMilliseconds,
				} = args;
				const { enterButtonCondition, exitButtonCondition } = trigger;
				const triggerValue =
					triggerFlags.enable |
					(enterButtonCondition ? 0 : triggerFlags.invertButtonOne) |
					(exitButtonCondition ? 0 : triggerFlags.invertButtonTwo);
				const coilMode = modes.pulseWithCancelButton;
				await writeCommand(
					'DL',
					coilId,
					triggerValue,
					enterButtonId,
					coilMode,
					exitButtonId,
					fullPowerTimeInMilliseconds,
					partialPowerTimeInDeciseconds,
					percentToByteValue(partialPowerPercent),
					restTimeInMilliseconds
				);
			};

			const latch = async (args: {
				coilId: number;
				buttonCondition: boolean;
				buttonId: number;
				kickTimeInMilliseconds: number;
				kickPowerPercent: number;
				latchPowerPercent: number;
				restTimeInMilliseconds: number;
			}) => {
				const {
					coilId,
					kickPowerPercent,
					kickTimeInMilliseconds,
					latchPowerPercent,
					buttonCondition,
					buttonId,
					restTimeInMilliseconds,
				} = args;
				const triggerValue = triggerFlags.enable | (buttonCondition ? 0 : triggerFlags.invertButtonOne);
				const coilMode = modes.pulseAndHold;
				await writeCommand(
					'DL',
					coilId,
					triggerValue,
					buttonId,
					coilMode,
					kickTimeInMilliseconds,
					percentToByteValue(kickPowerPercent),
					percentToByteValue(latchPowerPercent),
					restTimeInMilliseconds,
					0 // Says <NA> in docs, seems to work fine without sending this also, MPF sends 0 - maybe for legacy Nano reasons
				);
			};

			const modifyTrigger = async (args: {
				coilId: number;
				control: 'auto' | 'tap' | 'off' | 'on';
				buttonId?: number;
			}) => {
				const { coilId, control, buttonId } = args;
				const controlValue = control === 'auto' ? 0 : control === 'tap' ? 1 : control === 'off' ? 2 : /*on*/ 3;
				await writeCommand('TL', coilId, controlValue, buttonId);
			};

			const configurePulse = async (args: {
				coilId: number;
				buttonId?: number;
				buttonCondition?: boolean;
				pulsePowerPercent: number;
				pulseTimeInMilliseconds: number;
				restTimeInMilliseconds: number;
			}) => {
				const {
					coilId,
					pulsePowerPercent,
					pulseTimeInMilliseconds,
					restTimeInMilliseconds,
					buttonCondition,
					buttonId,
				} = args;
				const coilMode = modes.pulse;
				const triggerValue =
					triggerFlags.enable |
					(buttonId === undefined
						? triggerFlags.disableButton
						: buttonCondition
						? 0
						: triggerFlags.invertButtonOne);
				await writeCommand(
					'DL',
					coilId,
					triggerValue,
					buttonId || 0,
					coilMode,
					pulseTimeInMilliseconds,
					percentToByteValue(pulsePowerPercent),
					0,
					0,
					restTimeInMilliseconds
				);
			};

			let received = '';
			port.readable.pipeTo(
				new WritableStream({
					write: (chunk: Uint8Array) => {
						const lines = (received + new TextDecoder().decode(chunk)).split('\r');
						lines.forEach((line, index) => {
							// The last part doesn't end with \r so we just save it for now.  We will process it after we get the ending \r
							if (index === lines.length - 1) {
								received = line;
							} else {
								if (!line.startsWith('WD:P')) {
									console.log('read', line);
								}
								if (line.startsWith('SA:0E,')) {
									const buttonData = line.substring('SA:0E,'.length);
									const getClosed = (id: number) => {
										const byteIndex = Math.floor(id / 8);
										const byteValue = parseInt(
											buttonData.substring(byteIndex * 2, byteIndex * 2 + 2),
											16
										);
										return bitTest(byteValue, id % 8);
									};

									resolve({
										buttons: Array(maxButtonId + 1)
											.fill(0)
											.map((_, id) => ({ id, closed: getClosed(id) })),
										configureAutoTriggeredDiverter,
										latch,
										modifyTrigger,
										configurePulse,
									});
								} else if (line.startsWith('/L:') || line.startsWith('-L:')) {
									const closed = line[0] === '-';
									const buttonId = parseInt(line.substring('/L:'.length), 16);
									onButtonChange({ buttonId, closed });
								}
							}
						});
					},
				})
			);

			await clear();
			await configureHardware();
			await getButtonStates();

			setInterval(() => {
				setWatchdog({ timeoutInMilliseconds: 1000 });
			}, 500);
		})();
	});
};

export default fast;
