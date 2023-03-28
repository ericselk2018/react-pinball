import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Rule from '@/engine/entities/Rule';

// Transition from ready-to-play or waiting-for-next-player to playing when start button is pressed.
const playOnStart: Rule = ({ game }) => {
	const { pressedButtons, status, pressedButton, tapCoil, log, showingMenu, creditsNeeded } = game;

	if (status !== 'readyToPlay' && status !== 'waitingForNextPlayer') {
		return;
	}

	if (showingMenu !== 'game-setup' && status !== 'waitingForNextPlayer') {
		return;
	}

	if (
		pressedButton?.id === startButtonButton.id &&
		pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id) &&
		creditsNeeded <= 0
	) {
		game.status = 'playing';
		game.showingMenu = undefined;
		tapCoil({ coil: troughBallEjectCoil });
		game.ballsInPlay++;
		game.currentPlayer.ballsUsed++;
		game.startTurn();
		log('started play');
	}
};

export default playOnStart;
