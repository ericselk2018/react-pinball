import { troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Rule from '@/engine/entities/Rule';

// Handles auto ejecting the next ball when:
//  We are in playing status.
//  There are no more balls in play, or all in play are being held by kickers.
//  A ball is sitting over the eject coil, ready to be ejected (trough ball one button).
const ejectNextBall: Rule = ({ game }) => {
	const { ballsInPlay, pressedButtons, status, currentPlayer, tapCoil, log, kickersWithBalls } = game;

	if (status !== 'playing') {
		return;
	}

	if (ballsInPlay - kickersWithBalls.length) {
		return;
	}

	if (pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id)) {
		// Does not count as ball used if we eject because a ball went in a kicker.
		if (!ballsInPlay) {
			currentPlayer.ballsUsed++;
		}
		game.ballsInPlay++;
		setTimeout(() => {
			// Delay added to allow ball that just drained to roll down the trough some.
			// Otherwise when trough coil pulses, it may shake things enough that the
			// ball coming down the trough causes the switch to hit again making us
			// think the ball drained again.
			tapCoil({ coil: troughBallEjectCoil });
		}, 1000);
		log(
			`ejected next ball, now ${game.ballsInPlay} ball(s) in play and ${currentPlayer.ballsUsed} ball(s) used for ${currentPlayer.initials}`
		);
	}
};

export default ejectNextBall;
