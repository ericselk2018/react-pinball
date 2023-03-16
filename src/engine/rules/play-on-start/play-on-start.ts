import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Game from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

// Transition from ready-to-play to playing when start button is pressed.
const playOnStart: Rule = (args: { game: Game }) => {
	const { game } = args;
	const { pressedButtons, status, pressedButton, tapCoil, log } = game;

	if (status !== 'readyToPlay') {
		return;
	}

	if (
		pressedButton?.id === startButtonButton.id &&
		pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id)
	) {
		game.status = 'playing';
		tapCoil({ coil: troughBallEjectCoil });
		game.ballsInPlay++;
		game.currentPlayer.ballsUsed++;
		game.startTurn();
		log('started play');
	}
};

export default playOnStart;
