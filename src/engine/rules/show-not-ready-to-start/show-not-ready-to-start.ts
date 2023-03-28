import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import Game from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

// Display not-ready-to-start menu if player tries to start game before ready.
const showNotReadyToStart: Rule = (args: { game: Game }) => {
	const { game } = args;
	const { pressedButtons, status, pressedButton, log, showingMenu, creditsNeeded } = game;

	if (status !== 'starting' || showingMenu !== 'game-setup') {
		return;
	}

	if (
		pressedButton?.id === startButtonButton.id &&
		pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id) &&
		creditsNeeded <= 0
	) {
		game.showingMenu = 'not-ready-to-start';
		log('showed not ready to start menu');
	}
};

export default showNotReadyToStart;
