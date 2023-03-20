import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { maxPlayers } from '@/engine/const/setup/setup';
import { SelectedGameSetupMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

// Before game is started, allow changing number of players using flippers when selection is set to number of players.
const changeNumberOfPlayers: Rule = ({ game }) => {
	const { players, status, pressedButton, selectedMenuOption, log, addPlayer } = game;

	if (status !== 'readyToPlay' || selectedMenuOption !== SelectedGameSetupMenuOption.numberOfPlayers) {
		return;
	}

	if (pressedButton?.id === leftFlipperButtonButton.id) {
		if (players.length > 1) {
			players.length--;
			log(`left flipper changed number of players to ${players.length}`);
		}
	} else if (pressedButton?.id === rightFlipperButtonButton.id) {
		if (players.length < maxPlayers) {
			addPlayer();
			log(`right flipper changed number of players to ${players.length}`);
		}
	}
};

export default changeNumberOfPlayers;
