import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import { OptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const selectLights: Rule = ({ game }) => {
	const { lights, showingMenu, selectedMenuOption, pressedButton } = game;
	if (showingMenu === 'options' && selectedMenuOption === OptionsMenuOption.lights) {
		if (pressedButton?.id === leftFlipperButtonButton.id) {
			game.lights = lights === 'on' ? 'dim' : 'off';
		} else if (pressedButton?.id === rightFlipperButtonButton.id) {
			game.lights = lights === 'off' ? 'dim' : 'on';
		}
	}
};

export default selectLights;
