import Rule from '@/engine/entities/Rule';

// Runs conditionally as child of drain-last-ball rule.
// Ends the game when the final ball for the final player drains.
// Returns true if game over so parent can apply logic before calling other related rules.
const gameOver: Rule = ({ game }) => {
	const { currentPlayer, players, log } = game;
	const lastPlayer = players[players.length - 1];

	if (currentPlayer === lastPlayer && currentPlayer.ballsUsed === currentPlayer.ballsTotal) {
		game.endGame();
		log('game over');
		return true;
	}
};

export default gameOver;
