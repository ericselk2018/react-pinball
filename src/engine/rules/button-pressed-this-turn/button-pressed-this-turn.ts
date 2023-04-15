import Rule from '@/engine/entities/Rule';

// Mark button as pressed in the current turn.
const buttonPressedThisTurn: Rule = ({ game }) => {
	const { status, pressedButton, buttonsPressedThisTurn, log } = game;

	if (status !== 'playing' || !pressedButton) {
		return;
	}

	if (!buttonsPressedThisTurn.some((button) => button.id === pressedButton.id)) {
		buttonsPressedThisTurn.push(pressedButton);
		log(`button pressed this turn: ${pressedButton.name}`);
	}
};

export default buttonPressedThisTurn;
