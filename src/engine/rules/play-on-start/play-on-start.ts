import { startButtonButton, troughBallOneButton } from '@/engine/const/buttons/buttons';
import { troughBallEjectCoil } from '@/engine/const/coils/coils';
import Rule from '@/engine/entities/Rule';

// Transition from ready-to-play or waiting-for-next-player to playing when start button is pressed.
const playOnStart: Rule = ({ game }) => {
	const {
		pressedButtons,
		status,
		unpressedButton,
		tapCoil,
		log,
		showingMenu,
		creditsNeeded,
		playSoundEffect,
		startTurn,
	} = game;

	const pressedStartWithBallReadyToEject =
		unpressedButton?.id === startButtonButton.id &&
		pressedButtons.some((pressedButton) => pressedButton.id === troughBallOneButton.id);
	if (!pressedStartWithBallReadyToEject) {
		return;
	}

	const newGame = status === 'readyToPlay' && showingMenu === 'game-setup';
	const nextPlayer = status === 'waitingForNextPlayer' && !showingMenu;
	if (!newGame && !nextPlayer) {
		return;
	}

	if (newGame) {
		if (creditsNeeded > 0) {
			playSoundEffect({ soundEffect: 'Too Soon Junior' });
			return;
		}
		game.credits -= game.creditsRequired;
	}

	game.isFreePlay = false;
	game.status = 'playing';
	game.showingMenu = undefined;
	tapCoil({ coil: troughBallEjectCoil });
	game.ballsInPlay++;
	game.currentPlayer.ballsUsed++;
	startTurn();
	log('started play');
};

export default playOnStart;
