import { startButtonButton } from '@/engine/const/buttons/buttons';
import { minGameSetupMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const showGameSetup: Rule = ({ game }) => {
	const { showingMenu, status, unpressedButton, log } = game;
	if (status !== 'playing' && status !== 'waitingForLaunch' && status !== 'waitingForNextPlayer' && !showingMenu) {
		if (unpressedButton?.id === startButtonButton.id) {
			game.showingMenu = 'game-setup';
			game.selectedMenuOption = minGameSetupMenuOption;
			log('showed game setup');
		}
	}
};

export default showGameSetup;
