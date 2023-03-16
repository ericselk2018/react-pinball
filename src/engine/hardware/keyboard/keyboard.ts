import Hardware, { HardwareRequest, HardwareResponse } from '@/engine/entities/Hardware';

// Obviously not done.  Just here as an example of how to implement other hardware, in this case "virtual" hardware that
//  is controlled with the keyboard.  Virtual in quotes, because most keyboards I have seen are physical.
const keyboard: Hardware = (args: HardwareRequest): Promise<HardwareResponse> => {
	const { maxButtonId, onButtonChange } = args;

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Shift' && event.location === 1) {
			onButtonChange({ buttonId: 2, closed: true });
		} else if (event.key === 'Shift' && event.location === 2) {
			onButtonChange({ buttonId: 5, closed: true });
		}
	});

	return new Promise((resolve) => {
		const configureAutoTriggeredDiverter = () => {
			return Promise.resolve();
		};

		const configurePulse = () => {
			return Promise.resolve();
		};

		const latch = () => {
			return Promise.resolve();
		};

		const modifyTrigger = () => {
			return Promise.resolve();
		};

		resolve({
			buttons: Array(maxButtonId)
				.fill(0)
				.map((_, id) => ({ id, closed: false })),
			configureAutoTriggeredDiverter,
			configurePulse,
			latch,
			modifyTrigger,
		});
	});
};

export default keyboard;
