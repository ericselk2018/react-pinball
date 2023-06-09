import lights from '@/engine/const/lights/lights';
import Hardware, { HardwareRequest, HardwareResponse } from '@/engine/entities/Hardware';
import { filterUndefined } from '@/lib/array/array';
import { bitTest, clamp } from '@/lib/math/math';

// These will need to be adjusted if FAST changes these.
const usbVendorId = 11914;
const usbProductId = 4155;
const hardwareModel = 8192;

// We only have one EXP board in our system, so to KISS the values are just hard-coded here.
// FP-EXP-0081 is board that supports 256 LEDs and 0 servos
// For FP-EXP-0071 that supports 156 LEDs and some servos, the value is B4.
const expBoardType = '84';

// If more than one board you can solder jumpers to give them unique IDs.  Our board doesn't have
//  any jumpers soldered, so we use 0.
const expBoardId = '0';

interface SyncWriter {
	write: (chunk: Uint8Array) => void;
}

// Forget all current ports and ask for two ports to be selected.  The NET and EXP ports must be selected.
export const requestPorts = async () => {
	const ports = await navigator.serial.getPorts();
	for (const port of ports) {
		await port.forget();
	}
	await navigator.serial.requestPort({ filters: [{ usbVendorId, usbProductId }] });
	await navigator.serial.requestPort({ filters: [{ usbVendorId, usbProductId }] });
};

const fast: Hardware = async (args: HardwareRequest): Promise<HardwareResponse> => {
	const { onButtonChange, maxButtonId } = args;

	return new Promise((resolve) => {
		(async () => {
			let net: { port: SerialPort; writer: SyncWriter } | undefined = undefined;
			let exp: { port: SerialPort; writer: SyncWriter } | undefined = undefined;

			// Create a synchronous writer.  A thin wrapper around the native stream writer.
			//  Synchronous is so much easier to design around -- KISS
			const syncWriter = (writer: WritableStreamDefaultWriter): SyncWriter => {
				let buffer: Uint8Array | undefined = undefined;
				let writing = false;
				return {
					write: (chunk) => {
						// We just keep a buffer of the chunks to write in the order given.
						buffer = buffer ? new Uint8Array([...buffer, ...chunk]) : chunk;

						// If not already waiting for a previous write to complete, we start a new write now.
						if (!writing) {
							const write = () => {
								writing = !!buffer;
								if (writing) {
									// Write current buffer and then clear it.
									// Call write again after buffer is writtin, which will write anything else
									//  added to buffer while we were waiting, or do nothing if nothing new added yet.
									writer.write(buffer).then(write);
									buffer = undefined;
								}
							};
							write();
						}
					},
				};
			};

			const writeLineTo = (args: { text: string; writer: SyncWriter }) => {
				const { text, writer } = args;
				if (!text.startsWith('WD:')) {
					console.log('write', text);
				}
				writer.write(new TextEncoder().encode(text + '\r'));
			};

			const writeCommandTo = (writer: SyncWriter, command: string, ...args: Array<number | undefined>) => {
				const text = `${command}:${filterUndefined(args)
					.map((arg) => toHex(arg))
					.join(',')}`;
				writeLineTo({ text, writer });
			};

			const ports = await navigator.serial.getPorts();
			for (const port of ports) {
				await port.open({ baudRate: 921600 });
				const writer = syncWriter(port.writable.getWriter());
				const reader = port.readable.getReader();

				// Clear port in case it was waiting for some previous command that never finished.
				writeLineTo({ text: Array(2048).fill(' ').join(''), writer });

				writeCommandTo(writer, 'ID');

				let received = '';
				while (true) {
					const chunk = await reader.read();
					const lines = (received + new TextDecoder().decode(chunk.value)).split('\r');
					let id = '';
					for (let index = 0; index < lines.length - 1; index++) {
						const line = lines[index];
						console.log('read', line);
						if (line.startsWith('ID:NET')) {
							id = 'net';
							break;
						} else if (line.startsWith('ID:EXP')) {
							id = 'exp';
							break;
						}
					}
					if (id === 'net') {
						net = { port, writer };
						break;
					} else if (id === 'exp') {
						exp = { port, writer };
						break;
					}
					received = lines[lines.length - 1];
				}

				reader.releaseLock();
			}

			if (!net) {
				throw new Error(`NET port not found`);
			}
			if (!exp) {
				throw new Error(`EXP port not found`);
			}

			const { port, writer } = net;

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

			const millisecondsPerTick = 32;
			const millisecondsToTickByteValue = (value: number) =>
				clamp({ value: Math.round(value / millisecondsPerTick), min: 0, max: 255 });

			const writeLine = (args: { text: string }) => writeLineTo({ ...args, writer });

			const writeCommand = (command: string, ...args: Array<number | undefined>) => {
				const text = `${command}:${filterUndefined(args)
					.map((arg) => toHex(arg))
					.join(',')}`;
				writeLine({ text });
			};

			const configureHardware = () => {
				writeCommand('CH', hardwareModel, 1);
			};

			const getButtonStates = () => {
				writeCommand('SA');
			};

			const setWatchdog = (args: { timeoutInMilliseconds: number }) => {
				const { timeoutInMilliseconds } = args;
				writeCommand('WD', timeoutInMilliseconds);
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

			const configureAutoTriggeredDiverter = (args: {
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
				writeCommand(
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

			const latch = (args: {
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
				writeCommand(
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

			const modifyTrigger = (args: {
				coilId: number;
				control: 'auto' | 'tap' | 'off' | 'on';
				buttonId?: number;
			}) => {
				const { coilId, control, buttonId } = args;
				const controlValue = control === 'auto' ? 0 : control === 'tap' ? 1 : control === 'off' ? 2 : /*on*/ 3;
				writeCommand('TL', coilId, controlValue, buttonId);
			};

			const configurePulse = (args: {
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
				writeCommand(
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

			const updateLights = (args: {
				updates: {
					id: number;
					redPercent: number;
					greenPercent: number;
					bluePercent: number;
					fadeDurationInMilliseconds: number;
				}[];
			}) => {
				const { updates } = args;
				const count = updates.length;
				if (exp) {
					const { writer } = exp;
					writer.write(new TextEncoder().encode(`RL@${expBoardType}${expBoardId}:`));
					writer.write(Uint8Array.from([count]));
					for (const update of updates) {
						const { id, redPercent, greenPercent, bluePercent, fadeDurationInMilliseconds } = update;
						writer.write(
							Uint8Array.from([
								id,
								percentToByteValue(redPercent),
								percentToByteValue(greenPercent),
								percentToByteValue(bluePercent),
								millisecondsToTickByteValue(fadeDurationInMilliseconds),
							])
						);
					}
				}
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
										updateLights,
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

			configureHardware();
			getButtonStates();

			// Turn off all lights in case any where left
			updateLights({
				updates: lights.map((light) => ({
					id: light.id,
					redPercent: 0,
					greenPercent: 0,
					bluePercent: 0,
					fadeDurationInMilliseconds: 0,
				})),
			});

			setInterval(() => {
				setWatchdog({ timeoutInMilliseconds: 1000 });
			}, 500);
		})();
	});
};

export default fast;
