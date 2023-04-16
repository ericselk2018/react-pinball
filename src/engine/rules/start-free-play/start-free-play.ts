import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Game from '@/engine/entities/Game';
import Rule from '@/engine/entities/Rule';

let timeout: number | undefined = undefined;
let game: Game | undefined = undefined;

// If start button is pressed and held for 1 second, and we are ready to start a game, we start a special free play game.
const startFreePlay: Rule = (args) => {
	game = args.game;
	const { pressedButtons, status, unpressedButton, pressedButton, tapCoil, log, players, startNextGame, startTurn } =
		game;

	const startFreePlay = () => {
		// This will always be true, but we want to keep TypeScript happy.
		if (!game) {
			return;
		}

		const ballReadyToEject = pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id);
		if (!ballReadyToEject) {
			return;
		}

		if (status === 'playing' || status === 'waitingForNextPlayer' || status === 'waitingForLaunch') {
			return;
		}

		startNextGame();
		game.isFreePlay = true;
		players.length = 1;
		players[0].initials = 'MIA';
		players[0].score = 0;
		game.status = 'playing';
		game.showingMenu = undefined;
		tapCoil({ coil: troughBallEjectCoil });
		game.ballsInPlay++;
		game.currentPlayer.ballsUsed++;
		startTurn();
		log('started free play');
	};

	if (pressedButton === startButtonButton) {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = window.setTimeout(startFreePlay, 1000);
	} else if (unpressedButton === startButtonButton) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
	}
};

export default startFreePlay;
