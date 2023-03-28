import Rule from '@/engine/entities/Rule';

// Mark mode step button as complete when pressed.
const modeStepHit: Rule = ({ game }) => {
	const { status, pressedButton, currentModeStep, modeStepButtonsHitThisTurn, log } = game;

	if (status !== 'playing' || !pressedButton || !currentModeStep) {
		return;
	}

	const { buttons } = currentModeStep;
	if (buttons.some((button) => button.id === pressedButton.id)) {
		if (!modeStepButtonsHitThisTurn.some((button) => button.id === pressedButton.id)) {
			modeStepButtonsHitThisTurn.push(pressedButton);
			log(`mode step button hit this turn ${pressedButton.name}`);
		}
	}
};

export default modeStepHit;
