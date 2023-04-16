import { startButtonButton, usedTroughButtons } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

// Transition from starting to read-to-play when buttons are in required state:
//  All balls are in trough in the expected location.
//  All buttons are in their normal state - none pressed except trough slots with balls.
const readyToPlay: Rule = ({ game }) => {
	const { pressedButtons, status, log } = game;

	if (status !== 'starting') {
		return;
	}

	const problemButtons = pressedButtons.filter(
		(button) =>
			button !== startButtonButton && !usedTroughButtons.some((troughButton) => troughButton.id === button.id)
	);
	if (problemButtons.length) {
		game.error = `Button should not be pressed: ${problemButtons[0].name}`;
		return;
	}

	const notPressedUsedTroughButtons = usedTroughButtons.filter(
		(troughButton) => !pressedButtons.some((pressedButton) => pressedButton.id === troughButton.id)
	);
	if (notPressedUsedTroughButtons.length) {
		game.error = `Ball must be in: ${notPressedUsedTroughButtons[0].name}`;
		return;
	}

	game.status = 'readyToPlay';
	log('ready to play');
};

export default readyToPlay;
