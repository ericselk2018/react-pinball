import { plungerRolloverButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

const waitingForLaunch: Rule = ({ game }) => {
	const { ballsInPlay, status, pressedButton, unpressedButton, log } = game;

	if (ballsInPlay !== 1) {
		return;
	}

	if (status === 'playing') {
		if (pressedButton?.id === plungerRolloverButton.id) {
			game.status = 'waitingForLaunch';
			log('waiting for launch');
		}
	} else if (status === 'waitingForLaunch') {
		if (unpressedButton?.id === plungerRolloverButton.id) {
			game.status = 'playing';
			log('playing');
		}
	}
};

export default waitingForLaunch;
