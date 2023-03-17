import Rule from '@/engine/entities/Rule';

// When a ball comes out of a kicker, remove it from kickers-with-balls.
// This rule only gets applied if a ball comes out without us ejecting it, since we already
//  would have removed it from kickers-with-balls if we ejected it ourselves.
const removeBallFromKicker: Rule = ({ game }) => {
	const { kickersWithBalls, unpressedButton, status, log } = game;

	if (status !== 'playing') {
		return;
	}

	const kickerIndex = kickersWithBalls.findIndex((kicker) => kicker.button.id === unpressedButton?.id);
	if (kickerIndex === -1) {
		return;
	}

	log(`ball came out of kicker ${kickersWithBalls[kickerIndex].button.name}`);
	kickersWithBalls.splice(kickerIndex, 1);
};

export default removeBallFromKicker;
