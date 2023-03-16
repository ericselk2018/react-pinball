import { kickers } from '@/engine/const/kickers/kickers';
import { totalBallsInMachine } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

// Decides if balls should be kicked or held when a ball enters a kicker.
const kickOrHoldBall: Rule = ({ game }) => {
	const {
		ballsInPlay,
		pressedButton,
		status,
		kickersWithBalls,
		currentModeStep,
		tapCoil,
		modeStepButtonsHitThisTurn,
		log,
	} = game;

	if (status !== 'playing' || !currentModeStep) {
		return;
	}

	const kicker = kickers.find((kicker) => kicker.button.id === pressedButton?.id);
	if (!kicker) {
		return;
	}

	if (!currentModeStep.buttons.some((button) => button.id === kicker.button.id)) {
		tapCoil({ coil: kicker.coil });
		log(`rejected ball from entering kicker ${kicker.button.name}`);
		return;
	}

	if (ballsInPlay === totalBallsInMachine || kickersWithBalls.length === kickers.length) {
		log(
			`kickers full - ejecting balls from kickers ${[kicker, ...kickersWithBalls]
				.map((kicker) => kicker.button.name)
				.join(', ')}`
		);
		tapCoil({ coil: kicker.coil });
		kickersWithBalls.forEach(({ coil }) => tapCoil({ coil }));
		kickersWithBalls.length = 0;
		return;
	}

	kickersWithBalls.push(kicker);
	log(`ball held by kicker ${kicker.button.name}`);

	// REVIEW: Will we have a mode where the kicker isn't the final step?
	// Final mode of step complete, so reset.
	modeStepButtonsHitThisTurn.length = 0;
};

export default kickOrHoldBall;