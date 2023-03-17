import Rule from '@/engine/entities/Rule';

// Runs conditionally as child of drain-last-ball rule.
// Transitions to next player when final ball drains.
const nextPlayer: Rule = ({ game }) => {
	const { players, log } = game;

	// Does nothing for single player game.
	if (players.length === 1) {
		return;
	}

	game.status = 'waitingForNextPlayer';
	game.nextPlayer();

	log('waiting for next player');
};

export default nextPlayer;
