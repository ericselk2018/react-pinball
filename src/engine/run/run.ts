import buttons from '../const/buttons/buttons';
import modes from '../const/modes/modes';
import { startingBallsPerPlayer } from '../const/setup/setup';
import Game from '../entities/Game';
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
		game.turnStartTimeInMilliseconds = Date.now();
		game.buttonsPressedThisTurn.length = 0;
		game.modeStepButtonsHitThisTurn.length = 0;
	};

	const player: Player = {
		score: 0,
		ballsTotal: startingBallsPerPlayer,
		ballsUsed: 0,
		initials: 'AAA',
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

	const history: string[] = [];
	const game: Game = {
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
		players: [player],
		currentPlayer: player,
		pressedButtons: [],
		pressedButton: undefined,
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
