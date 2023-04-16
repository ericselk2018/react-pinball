import { selectButtonButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

const showOptions: Rule = ({ game }) => {
	const { status, unpressedButton, showingMenu } = game;
	if (status !== 'playing' && !showingMenu) {
		if (unpressedButton?.id === selectButtonButton.id) {
			game.showingMenu = 'options';
			game.selectedMenuOption = 0;
		}
	}
};

export default showOptions;
