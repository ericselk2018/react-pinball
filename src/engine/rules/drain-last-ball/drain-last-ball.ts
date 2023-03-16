import { lastTroughButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';
import ballSave from './ball-save/ball-save';
import gameOver from './game-over/game-over';
import waitingForNextPlayer from './waiting-for-next-player/waiting-for-next-player';

// A collection or rules that run when the last ball in play is drained.
// Nested rules used here because they need to run conditionally based on the result of a previous rule.
const drainLastBall: Rule = ({ game }) => {
	const { ballsInPlay, pressedButton, status, log } = game;

	// Only when drain is hit and no more balls in play.
	if (status !== 'playing' || pressedButton?.id !== lastTroughButton.id || ballsInPlay) {
		return;
	}

	log('drained last ball');

	const ballSaved = ballSave({ game });
	if (!ballSaved) {
		waitingForNextPlayer({ game });
		gameOver({ game });
	}
};

export default drainLastBall;
