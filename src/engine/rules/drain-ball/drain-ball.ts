import { lastTroughButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

// Decrease count of balls in play when drain is hit.
const drainBall: Rule = ({ game }) => {
	const { pressedButton, status, log } = game;

	// Only when drain is hit.
	if (status !== 'playing' || pressedButton?.id !== lastTroughButton.id) {
		return;
	}

	game.ballsInPlay--;

	log(`ball drained, now ${game.ballsInPlay} ball(s) in play`);
};

export default drainBall;
