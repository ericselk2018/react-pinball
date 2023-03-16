import { lastTroughButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

// Kicks balls out of all kickers anytime a ball is drained.
const kickBallsOnDrain: Rule = ({ game }) => {
	const { pressedButton, status, tapCoil, log, kickersWithBalls } = game;

	// Only when drain is hit.
	if (status !== 'playing' || pressedButton?.id !== lastTroughButton.id) {
		return;
	}

	if (kickersWithBalls.length) {
		kickersWithBalls.forEach(({ coil }) => tapCoil({ coil }));
		log(`kicked balls from kickers because of drain: ${kickersWithBalls.map((k) => k.button.name).join(', ')}`);
	}
};

export default kickBallsOnDrain;
