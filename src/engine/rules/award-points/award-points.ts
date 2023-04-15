import { pointsPerButtonHit } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

const awardPoints: Rule = ({ game }) => {
	const { currentPlayer, pressedButton, status, shots } = game;

	if (status !== 'playing' || !pressedButton) {
		return;
	}

	const points = pressedButton.dificulty * pointsPerButtonHit;
	currentPlayer.score += points;
	shots.push({ name: '', points });
};

export default awardPoints;
