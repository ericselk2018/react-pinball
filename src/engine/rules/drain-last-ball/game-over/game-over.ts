import Rule from '@/engine/entities/Rule';

// Runs conditionally as child of drain-last-ball rule.
// Ends the game when the final ball for the final player drains.
const gameOver: Rule = ({ game }) => {
	const { currentPlayer, players, log } = game;
	const lastPlayer = players[players.length - 1];

	if (currentPlayer === lastPlayer && currentPlayer.ballsUsed === currentPlayer.ballsTotal) {
		game.status = 'gameOver';
		log('game over');
	}
};

export default gameOver;
