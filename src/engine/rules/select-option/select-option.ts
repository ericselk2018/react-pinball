import { selectButtonButton } from '@/engine/const/buttons/buttons';
import { maxOptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const selectOption: Rule = ({ game }) => {
	const { showingMenu, unpressedButton } = game;
	if (showingMenu === 'options') {
		if (unpressedButton?.id === selectButtonButton.id) {
			if (game.selectedMenuOption === maxOptionsMenuOption) {
				game.selectedMenuOption = 0;
			} else {
				game.selectedMenuOption++;
			}
			game.showingMenuDetails = false;
		}
	}
};

export default selectOption;
