import { kickers } from '@/engine/const/kickers/kickers';
import Rule from '@/engine/entities/Rule';

// During startup, if balls are stuck in holes from a previous game unepxected shutdown, kick them out.
const clearKickersOnStart: Rule = ({ game }) => {
	const { status, pressedButtons, tapCoil, log } = game;

	if (status !== 'starting') {
		return;
	}

	const kickersWithBalls = kickers.filter((kicker) =>
		pressedButtons.some((pressedButton) => pressedButton.id === kicker.button.id)
	);

	if (kickersWithBalls.length) {
		log(`clearing kickers with balls: ${kickersWithBalls.map((k) => k.button.name).join(', ')}`);
		for (const kicker of kickersWithBalls) {
			tapCoil({ coil: kicker.coil });
		}
	}
};

export default clearKickersOnStart;
