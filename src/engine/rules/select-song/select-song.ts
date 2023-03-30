import { leftFlipperButtonButton, rightFlipperButtonButton } from '@/engine/const/buttons/buttons';
import songs from '@/engine/const/songs/songs';
import { OptionsMenuOption } from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

const selectSong: Rule = ({ game }) => {
	const { showingMenu, selectedMenuOption, pressedButton, song } = game;
	if (showingMenu === 'options' && selectedMenuOption === OptionsMenuOption.song) {
		const songIndex = songs.indexOf(song);
		if (pressedButton?.id === leftFlipperButtonButton.id) {
			if (songIndex) {
				game.song = songs[songIndex - 1];
			} else {
				game.song = songs[songs.length - 1];
			}
		} else if (pressedButton?.id === rightFlipperButtonButton.id) {
			if (songIndex < songs.length - 1) {
				game.song = songs[songIndex + 1];
			} else {
				game.song = songs[0];
			}
		}
	}
};

export default selectSong;
