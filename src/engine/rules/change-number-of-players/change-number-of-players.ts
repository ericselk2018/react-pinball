import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { maxPlayers } from '@/engine/const/setup/setup';
import { Selected } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

// Before game is started, allow changing number of players using flippers when selection is set to number of players.
const changeNumberOfPlayers: Rule = ({ game }) => {
	const { players, status, pressedButton, selected, log } = game;

	if (status !== 'readyToPlay' || selected !== Selected.numberOfPlayers) {
		return;
	}

	if (pressedButton?.id === leftFlipperButtonButton.id) {
		if (players.length) {
			players.length--;
			log(`left flipper changed number of players to ${players.length}`);
		}
	} else if (pressedButton?.id === rightFlipperButtonButton.id) {
		if (players.length < maxPlayers) {
			players.length++;
			log(`right flipper changed number of players to ${players.length}`);
		}
	}
};

export default changeNumberOfPlayers;
