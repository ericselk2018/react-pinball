import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { initialsLength } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';
import { changeLetterAt } from '@/lib/string/string';

// Allow changing player initials with flipper buttons when selected during pre-game setup.
const changePlayerInitials: Rule = ({ game }) => {
	const { players, status, selectedMenuOption, pressedButton, showingMenu } = game;

	if (
		status === 'playing' ||
		status === 'waitingForLaunch' ||
		status === 'waitingForNextPlayer' ||
		showingMenu !== 'game-setup'
	) {
		return;
	}

	const maxSelected = players.length * initialsLength - 1;
	if (selectedMenuOption < 0 || selectedMenuOption > maxSelected) {
		return;
	}

	const down =
		pressedButton?.id === leftFlipperButtonButton.id
			? true
			: pressedButton?.id === rightFlipperButtonButton.id
			? false
			: undefined;
	if (down === undefined) {
		return;
	}

	const selectedPlayerIndex = Math.floor(selectedMenuOption / initialsLength);
	const selectedPlayer = players[selectedPlayerIndex];
	const { initials } = selectedPlayer;
	const selectedInitialIndex = selectedMenuOption % initialsLength;

	selectedPlayer.initials = changeLetterAt({ text: initials, index: selectedInitialIndex, down });
};

export default changePlayerInitials;
