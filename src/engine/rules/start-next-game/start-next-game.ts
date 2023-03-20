import { startButtonButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

const startNextGame: Rule = ({ game }) => {
	const { status, log, pressedButton, startNextGame, showingMenu } = game;

	if (status !== 'gameOver' || showingMenu) {
		return;
	}

	if (pressedButton?.id === startButtonButton.id) {
		game.status = 'starting';
		log('starting next game');
		startNextGame();
	}
};

export default startNextGame;
