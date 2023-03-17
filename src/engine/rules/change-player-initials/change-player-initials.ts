import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { initialsLength } from '@/engine/const/setup/setup';
import Rule from '@/engine/entities/Rule';
import { changeLetterAt } from '@/lib/string/string';

// Allow changing player initials with flipper buttons when selected during pre-game setup.
const changePlayerInitials: Rule = ({ game }) => {
	const { players, status, selected, pressedButton } = game;

	if (status !== 'readyToPlay') {
		return;
	}

	const maxSelected = players.length * initialsLength - 1;
	if (selected < 0 || selected > maxSelected) {
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

	const selectedPlayerIndex = Math.floor(selected / initialsLength);
	const selectedPlayer = players[selectedPlayerIndex];
	const { initials } = selectedPlayer;
	const selectedInitialIndex = selected % initialsLength;

	selectedPlayer.initials = changeLetterAt({ text: initials, index: selectedInitialIndex, down });
};

export default changePlayerInitials;
