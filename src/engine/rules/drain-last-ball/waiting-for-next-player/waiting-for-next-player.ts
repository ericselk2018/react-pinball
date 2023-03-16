import Rule from '@/engine/entities/Rule';

// Runs conditionally as child of drain-last-ball rule.
// Changes status to waiting-for-next-player when final ball drains for current player; only if multi-player game.
const waitingForNextPlayer: Rule = ({ game }) => {
	const { players, log } = game;

	// Does nothing for single player game.
	if (players.length === 1) {
		return;
	}

	game.status = 'waitingForNextPlayer';

	log('waiting for next player');
};

export default waitingForNextPlayer;
