import { ballSaveTimeInSeconds } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';

// Runs conditionally as child of drain-last-ball rule.
// Returns used ball to current player if all balls are drained before ball save timer has ellapsed.
// Returns true if ball was saved, so that parent rule can apply logic for other related rules.
const ballSave: Rule = ({ game }) => {
	const { turnStartTimeInMilliseconds, currentPlayer, log } = game;

	// Only if turn was not long enough.
	const turnDurationInSeconds = (Date.now() - turnStartTimeInMilliseconds) / 1000;
	if (turnDurationInSeconds > ballSaveTimeInSeconds) {
		return;
	}

	currentPlayer.ballsUsed--;

	log(`ball saved, now has ${currentPlayer.ballsUsed} ball(s) used`);

	return true;
};

export default ballSave;
