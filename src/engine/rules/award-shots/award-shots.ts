import comboShots from '@/engine/const/combo-shots/combo-shots';
import { pointsPerButtonHit } from '@/engine/const/setup/setup';
import ComboShot from '@/engine/entities/ComboShot';
import Rule from '@/engine/entities/Rule';

const awardShots: Rule = ({ game }) => {
	const { currentPlayer, pressedButton, status, shots, comboShotTracker } = game;

	if (status !== 'playing' || !pressedButton) {
		return;
	}

	const shotsCompleted: ComboShot[] = [];

	comboShots.forEach((shot) => {
		const tracker = comboShotTracker.find((tracker) => tracker.shot === shot);
		const buttonsHit = tracker?.hits.length || 0;

		const addHit = () => {
			if (buttonsHit + 1 === shot.buttons.length) {
				shotsCompleted.push(shot);
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

	const calculatePoints = (shot: ComboShot) => shot.dificulty * pointsPerButtonHit;

	// We only allow one shot to complete per button press.
	// The shot with the highest value is awarded.
	// Progress of other shots are not reset, so they can still be completed if button is pressed again.
	const highestPointShotCompleted = shotsCompleted.sort((a, b) => calculatePoints(b) - calculatePoints(a))[0];
	if (highestPointShotCompleted) {
		const tracker = comboShotTracker.find((tracker) => tracker.shot === highestPointShotCompleted);
		if (tracker) {
			// Reset progress so that shot can be awarded again.
			tracker.hits.length = 0;
		}

		// Award points and add to shots log so UI can display award.
		const points = calculatePoints(highestPointShotCompleted);
		shots.push({ name: highestPointShotCompleted.name, points });
		currentPlayer.score += points;
	}
};

export default awardShots;
