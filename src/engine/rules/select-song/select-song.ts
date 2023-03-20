import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import songs from '@/engine/const/songs/songs';
import { OptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const selectSong: Rule = ({ game }) => {
	const { showingMenu, selectedMenuOption, pressedButton, song } = game;
	if (showingMenu === 'options' && selectedMenuOption === OptionsMenuOption.song) {
		if (pressedButton?.id === leftFlipperButtonButton.id) {
			if (song) {
				game.song--;
			} else {
				game.song = songs.length - 1;
			}
		} else if (pressedButton?.id === rightFlipperButtonButton.id) {
			if (song < songs.length - 1) {
				game.song++;
			} else {
				game.song = 0;
			}
		}
	}
};

export default selectSong;
