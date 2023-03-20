import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { OptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const toggleLastGame: Rule = ({ game }) => {
	const { showingMenu, selectedMenuOption, showingMenuDetails, pressedButton } = game;
	if (showingMenu === 'options' && selectedMenuOption === OptionsMenuOption.lastGame) {
		if (pressedButton?.id === leftFlipperButtonButton.id || pressedButton?.id === rightFlipperButtonButton.id) {
			game.showingMenuDetails = !showingMenuDetails;
		}
	}
};

export default toggleLastGame;
