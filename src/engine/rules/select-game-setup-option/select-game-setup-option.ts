import { selectButtonButton } from '@/engine/const/buttons/buttons';
import { initialsLength } from '@/engine/const/setup/setup';
import { minGameSetupMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const selectGameSetupOption: Rule = ({ game }) => {
	const { players, status, unpressedButton, selectedMenuOption, log, showingMenu } = game;

	if (status === 'playing' || status === 'waitingForLaunch' || status === 'waitingForNextPlayer') {
		return;
	}

	if (showingMenu !== 'game-setup') {
		return;
	}

	if (unpressedButton?.id === selectButtonButton.id) {
		const maxSelected = players.length * initialsLength - 1;
		if (selectedMenuOption === maxSelected) {
			game.selectedMenuOption = minGameSetupMenuOption;
		} else {
			game.selectedMenuOption++;
		}
		log(`game setup selected changed to ${game.selectedMenuOption}`);
	}
};

export default selectGameSetupOption;
