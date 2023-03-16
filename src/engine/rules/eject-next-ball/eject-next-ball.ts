import { troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import { kickers } from '@/engine/const/kickers/kickers';
import Rule from '@/engine/entities/Rule';

// Handles auto ejecting the next ball when:
//  We are in playing status.
//  There are no more balls in play, or all in play are being held by kickers.
//  A ball is sitting over the eject coil, ready to be ejected (trough ball one button).
const ejectNextBall: Rule = ({ game }) => {
	const { ballsInPlay, pressedButtons, status, currentPlayer, tapCoil, log } = game;

	if (status !== 'playing') {
		return;
	}

	const kickersWithBalls = kickers.filter((kicker) =>
		pressedButtons.some((pressedButton) => pressedButton.id == kicker.button.id)
	);

	if (ballsInPlay - kickersWithBalls.length) {
		return;
	}

	if (pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id)) {
		// Does not count as ball used if we eject because a ball went in a kicker.
		if (!ballsInPlay) {
			currentPlayer.ballsUsed++;
		}
		game.ballsInPlay++;
		tapCoil({ coil: troughBallEjectCoil });
		log(
			`ejected next ball, now ${game.ballsInPlay} ball(s) in play and ${currentPlayer.ballsUsed} ball(s) used for ${currentPlayer.initials}`
		);
	}
};

export default ejectNextBall;
