import Rule from '@/engine/entities/Rule';

// Hides not ready to start menu when game is ready.
const hideNotReadyToStart: Rule = ({ game }) => {
	const { status, showingMenu, log } = game;
	if (status !== 'starting' && showingMenu === 'not-ready-to-start') {
		game.showingMenu = undefined;
		log('not ready to start menu hidden');
	}
};

export default hideNotReadyToStart;
