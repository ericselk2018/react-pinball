import { selectButtonButton } from '@/engine/const/buttons/buttons';
import Rule from '@/engine/entities/Rule';

let timeout: number | undefined = undefined;

// If select button is pressed and held for 1 second, toggle debug.
const toggleDebug: Rule = ({ game }) => {
	const { unpressedButton, pressedButton, update } = game;

	const toggleDebug = () => {
		update({
			updater: ({ game }) => {
				const { log } = game;

				game.debug = !game.debug;

				log(`debug set to ${game.debug}`);
			},
		});
	};

	if (pressedButton === selectButtonButton) {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = window.setTimeout(toggleDebug, 1000);
	} else if (unpressedButton === selectButtonButton) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
	}
};

export default toggleDebug;
