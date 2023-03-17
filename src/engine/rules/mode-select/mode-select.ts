import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import modes from '@/engine/const/modes/modes';
import Rule from '@/engine/entities/Rule';

// While waiting for launch, allow mode selection using flipper buttons.
const modeSelect: Rule = ({ game }) => {
	const { pressedButton, status, currentMode, log } = game;

	if (status !== 'waitingForLaunch' || !pressedButton) {
		return;
	}

	if (pressedButton.id === rightFlipperButtonButton.id) {
		const currentModeIndex = modes.indexOf(currentMode);
		if (currentModeIndex === modes.length - 1) {
			game.currentMode = modes[0];
		} else {
			game.currentMode = modes[currentModeIndex + 1];
		}
		log(`right flipper button changed mode to ${game.currentMode.name}`);
	} else if (pressedButton.id === leftFlipperButtonButton.id) {
		const currentModeIndex = modes.indexOf(currentMode);
		if (currentModeIndex) {
			game.currentMode = modes[currentModeIndex - 1];
		} else {
			game.currentMode = modes[modes.length - 1];
		}
		log(`left flipper button changed mode to ${game.currentMode.name}`);
	}
};

export default modeSelect;
