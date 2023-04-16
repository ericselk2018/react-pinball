import comboShots from '@/engine/const/combo-shots/combo-shots';
import { pointsPerButtonHit } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

const awardShots: Rule = ({ game }) => {
	const { currentPlayer, pressedButton, status, shots, comboShotTracker } = game;

	if (status !== 'playing' || !pressedButton) {
		return;
	}

	comboShots.forEach((shot) => {
		const tracker = comboShotTracker.find((tracker) => tracker.shot === shot);
		const buttonsHit = tracker?.hits.length || 0;

		const addHit = () => {
			if (buttonsHit + 1 === shot.buttons.length) {
				if (tracker) {
					// Reset progress so that shot can be awarded again.
					tracker.hits.length = 0;
				}

				// Award points and add to shots log so UI can display award.
				const points = shot.dificulty * pointsPerButtonHit;
				shots.push({ name: shot.name, points });
				currentPlayer.score += points;
			} else if (tracker) {
				tracker.hits.push(pressedButton);
			} else {
				comboShotTracker.push({ shot, hits: [pressedButton] });
			}
		};

		if (shot.mustHitInOrder) {
			const nextButton = shot.buttons[tracker?.hits.length || 0];
			if (nextButton === pressedButton) {
				addHit();
			} else if (tracker) {
				// Not hit in order, so any existing progress is lost.
				tracker.hits.length = 0;
			}
		} else if (shot.buttons.includes(pressedButton) && !tracker?.hits.includes(pressedButton)) {
			addHit();
		}
	});
};

export default awardShots;
