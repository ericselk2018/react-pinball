import buttons, {
	coinSlotButton,
	lastTroughButton,
	leftFlipperButtonButton,
	middleBumperButton,
	plungerRolloverButton,
	rightFlipperButtonButton,
	selectButtonButton,
	startButtonButton,
	usedTroughButtons,
} from '@/engine/const/buttons/buttons';
import Hardware, { HardwareRequest, HardwareResponse } from '@/engine/entities/Hardware';

const map = [
	{
		key: 'Shift',
		location: 1,
		button: leftFlipperButtonButton,
	},
	{
		key: 'Shift',
		location: 2,
		button: rightFlipperButtonButton,
	},
	{
		key: 'Tab',
		button: selectButtonButton,
	},
	{
		key: 'Enter',
		button: startButtonButton,
	},
	{
		key: 'c',
		button: coinSlotButton,
	},
	{
		key: 'p',
		button: plungerRolloverButton,
	},
	{
		key: 'b',
		button: middleBumperButton,
	},
];

// Obviously not done.  Just here as an example of how to implement other hardware, in this case "virtual" hardware that
//  is controlled with the keyboard.  Virtual in quotes, because most keyboards I have seen are physical.
const keyboard: Hardware = (args: HardwareRequest): Promise<HardwareResponse> => {
	const { maxButtonId, onButtonChange } = args;

	const handleEvent = (args: { event: KeyboardEvent; down: boolean }) => {
		const { event, down } = args;
		if (event.repeat) {
			return;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			onButtonChange({ buttonId: lastTroughButton.id, closed: !lastTroughButton.name });
			return;
		}
		map.forEach(({ key, location, button }) => {
			if (event.key === key && (location === undefined || event.location === location)) {
				event.preventDefault();
				onButtonChange({
					buttonId: button.id,
					closed: down ? !!button.normallyClosed : !button.normallyClosed,
				});
			}
		});
	};

	window.addEventListener('keydown', (event) => handleEvent({ event, down: true }));
	window.addEventListener('keyup', (event) => handleEvent({ event, down: false }));

	return new Promise((resolve) => {
		const configureAutoTriggeredDiverter = () => {
			//
		};

		const configurePulse = () => {
			//
		};

		const latch = () => {
			//
		};

		const modifyTrigger = () => {
			//
		};

		const updateLights = () => {
			//
		};

		resolve({
			buttons: Array(maxButtonId + 1)
				.fill(0)
				.map((_, id) => {
					const usedTroughButton = usedTroughButtons.find((button) => button.id === id);
					const closed = usedTroughButton
						? !usedTroughButton.normallyClosed
						: !!buttons.find((button) => button.id === id)?.normallyClosed;
					return { id, closed };
				}),
			configureAutoTriggeredDiverter,
			configurePulse,
			latch,
			modifyTrigger,
			updateLights,
		});
	});
};

export default keyboard;
