import { startButtonButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

const hideOptions: Rule = ({ game }) => {
	const { showingMenu, pressedButton } = game;
	if (showingMenu === 'options') {
		if (pressedButton?.id === startButtonButton.id) {
			game.showingMenu = undefined;
		}
	}
};

export default hideOptions;
