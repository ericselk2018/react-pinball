import buttons from '../const/buttons/buttons';
import modes from '../const/modes/modes';
import { initialsLength, startingBallsPerPlayer } from '../const/setup/setup';
import Game, { Selected } from '../entities/Game';
import Hardware from '../entities/Hardware';
import Player from '../entities/Player';
import rules from '../rules/rules';
import start from '../start/start';

const run = async (args: { hardware: Hardware; onUpdate: (args: { game: Game }) => void }) => {
	const { hardware, onUpdate } = args;

	const onButtonChange = (args: { buttonId: number; closed: boolean }) => {
		const { buttonId, closed } = args;
		const toggledButton = buttonState.find((button) => button.id === buttonId);
		if (toggledButton) {
			toggledButton.closed = closed;
			runRules({ toggledButtonId: toggledButton.id, closed });
		}
	};

	const { buttons: buttonState, enableOrDisableFlippers, tapCoil } = await start({ hardware, onButtonChange });

	const startTurn = () => {
		const { log } = game;
		game.turnStartTimeInMilliseconds = Date.now();
		game.buttonsPressedThisTurn.length = 0;
		game.modeStepButtonsHitThisTurn.length = 0;
		log('started next turn');
	};

	const player1: Player = {
		score: 0,
		ballsTotal: startingBallsPerPlayer,
		ballsUsed: 0,
		initials: Array(initialsLength).fill('A').join(''),
	};

	const player2: Player = {
		...player1,
		initials: Array(initialsLength).fill('B').join(''),
	};

	const getCurrentModeStep = () => {
		const { currentMode, modeStepButtonsHitThisTurn } = game;
		const modeSteps = currentMode.steps.map((step) => {
			return {
				...step,
				buttons: step.buttons.map((button) => ({
					...button,
					hit: modeStepButtonsHitThisTurn.some((b) => b.id === button.id),
				})),
			};
		});

		const currentModeStep = modeSteps.find(
			(step) => step.buttons.filter((sw) => sw.hit).length < (step.count || 1)
		);

		return currentModeStep;
	};

	const startNextGame = () => {
		const { players, log } = game;
		players.forEach((player) => {
			player.ballsUsed = 0;
			player.ballsTotal = startingBallsPerPlayer;
			player.score = 0;
		});
		log('next game started');
	};

	const nextPlayer = () => {
		const { players, currentPlayer, log } = game;
		const currentPlayerIndex = players.indexOf(currentPlayer);
		if (currentPlayerIndex === players.length - 1) {
			game.currentPlayer = players[0];
		} else {
			game.currentPlayer = players[currentPlayerIndex + 1];
		}
		log(`player changed to ${game.currentPlayer.initials}`);
	};

	const history: string[] = [];
	const game: Game = {
		selected: Selected.numberOfPlayers,
		nextPlayer,
		startNextGame,
		log: (message) => history.push(message),
		history,
		kickersWithBalls: [],
		currentModeStepButtonsCompleted: [],
		get currentModeStep() {
			return getCurrentModeStep();
		},
		currentMode: modes[0],
		buttonsPressedThisTurn: [],
		modeStepButtonsHitThisTurn: [],
		turnStartTimeInMilliseconds: 0,
		ballsInPlay: 0,
		status: 'starting',
		error: '',
		credits: 0,
		players: [player1, player2],
		currentPlayer: player1,
		pressedButtons: [],
		pressedButton: undefined,
		unpressedButton: undefined,
		enableOrDisableFlippers,
		tapCoil,
		startTurn,
	};

	const runRules = (args?: { toggledButtonId: number; closed: boolean }) => {
		const toggledButtonId = args?.toggledButtonId;
		const closed = args?.closed;

		const toggledButton =
			toggledButtonId !== undefined ? buttons.find((button) => button.id === toggledButtonId) : undefined;

		game.pressedButton = !!toggledButton?.normallyClosed !== closed ? toggledButton : undefined;
		game.unpressedButton = !!toggledButton?.normallyClosed === closed ? toggledButton : undefined;

		game.pressedButtons = buttons.filter((button) =>
			buttonState.some((b) => button.id === b.id && !!button.normallyClosed !== b.closed)
		);

		game.error = '';

		rules.forEach((rule) => rule({ game }));

		onUpdate({ game });
	};

	runRules();
};

export default run;
