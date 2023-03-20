import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { OptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const setVolume: Rule = ({ game }) => {
	const { showingMenu, selectedMenuOption, volume, pressedButton } = game;
	if (showingMenu === 'options' && selectedMenuOption === OptionsMenuOption.volume) {
		if (pressedButton?.id === leftFlipperButtonButton.id) {
			game.volume = Math.max(volume - 0.1, 0);
		} else if (pressedButton?.id === rightFlipperButtonButton.id) {
			game.volume = Math.min(volume + 0.1, 1);
		}
	}
};

export default setVolume;
