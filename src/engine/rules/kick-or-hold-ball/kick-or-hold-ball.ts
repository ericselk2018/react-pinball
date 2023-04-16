import { kickers } from '@/engine/const/kickers/kickers';
import { totalBallsInMachine } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

// Decides if balls should be kicked or held when a ball enters a kicker.
const kickOrHoldBall: Rule = ({ game }) => {
	const {
		status,
		pressedButton,
		kickersWithBalls,
		currentModeStep,
		tapCoil,
		modeStepButtonsHitThisTurn,
		log,
		playSoundEffect,
	} = game;

	const kicker = kickers.find((kicker) => kicker.button.id === pressedButton?.id);
	if (!kicker) {
		return;
	}

	if (status !== 'playing' || !currentModeStep?.buttons.some((button) => button.id === kicker.button.id)) {
		tapCoil({ coil: kicker.coil });
		log(`rejected ball from entering kicker ${kicker.button.name}`);
		playSoundEffect({ soundEffects: ['reject1', 'reject2', 'reject3', 'reject4'] });
		return;
	}

	if (kickersWithBalls.length + 1 === totalBallsInMachine || kickersWithBalls.length + 1 === kickers.length) {
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
