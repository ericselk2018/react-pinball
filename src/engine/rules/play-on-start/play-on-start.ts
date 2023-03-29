import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Rule from '@/engine/entities/Rule';

// Transition from ready-to-play or waiting-for-next-player to playing when start button is pressed.
const playOnStart: Rule = ({ game }) => {
	const { pressedButtons, status, pressedButton, tapCoil, log, showingMenu, creditsNeeded } = game;

	const pressedStartWithBallReadyToEject =
		pressedButton?.id === startButtonButton.id &&
		pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id);
	if (!pressedStartWithBallReadyToEject) {
		return;
	}

	const newGame = status === 'readyToPlay' && showingMenu === 'game-setup';
	const nextPlayer = status === 'waitingForNextPlayer' && !showingMenu;
	if (!newGame && !nextPlayer) {
		return;
	}

	if (newGame) {
		if (creditsNeeded > 0) {
			return;
		}
		game.credits -= game.creditsRequired;
	}

	game.status = 'playing';
	game.showingMenu = undefined;
	tapCoil({ coil: troughBallEjectCoil });
	game.ballsInPlay++;
	game.currentPlayer.ballsUsed++;
	game.startTurn();
	log('started play');
};

export default playOnStart;
