import { pointsPerButtonHit } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

const awardPoints: Rule = ({ game }) => {
	const { currentPlayer, pressedButton, status } = game;

	if (status !== 'playing' || !pressedButton) {
		return;
	}

	currentPlayer.score += pressedButton.dificulty * pointsPerButtonHit;
};

export default awardPoints;
