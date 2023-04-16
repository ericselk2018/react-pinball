import { targetButtons } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

// Mark mode step button as complete when pressed.
const modeStepHit: Rule = ({ game }) => {
	const { status, pressedButton, currentModeStep, modeStepButtonsHitThisTurn, log, playSoundEffect } = game;

	if (status !== 'playing' || !pressedButton || !currentModeStep) {
		return;
	}

	const { buttons } = currentModeStep;
	if (buttons.some((button) => button.id === pressedButton.id)) {
		if (!modeStepButtonsHitThisTurn.some((button) => button.id === pressedButton.id)) {
			modeStepButtonsHitThisTurn.push(pressedButton);
			const targetButton = targetButtons.find((b) => b === pressedButton);
			if (targetButton?.soundEffects) {
				playSoundEffect({ soundEffects: targetButton.soundEffects });
			}
			if (!game.currentModeStep) {
				// TODO: Final step completed - decide what to do here.
			}
			log(`mode step button hit this turn ${pressedButton.name}`);
		}
	}
};

export default modeStepHit;
