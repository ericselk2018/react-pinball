import { selectButtonButton } from '@/engine/const/buttons/buttons';
import { initialsLength } from '@/engine/const/setup/setup';
import { minSelected } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

// Toggle selection when select button is pressed before game started.
const prePlaySelect: Rule = ({ game }) => {
	const { status, pressedButton, selected, players, log } = game;

	if (status !== 'readyToPlay') {
		return;
	}

	if (pressedButton?.id === selectButtonButton.id) {
		const maxSelected = players.length * initialsLength - 1;
		if (selected === maxSelected) {
			game.selected = minSelected;
		} else {
			game.selected++;
		}
		log(`selected changed to ${game.selected}`);
	}
};

export default prePlaySelect;
