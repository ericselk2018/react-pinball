import buttons from '../const/buttons/buttons';
import modes from '../const/modes/modes';
import { creditsPerPlayer, initialsLength, maxPlayers, startingBallsPerPlayer } from '../const/setup/setup';
import songs from '../const/songs/songs';
import Game, { OptionsMenuOption, SelectedGameSetupMenuOption, Status } from '../entities/Game';
import Hardware from '../entities/Hardware';
import HighScore from '../entities/HighScore';
import Player from '../entities/Player';
import lightUpdater from '../light-updater/light-updater';
import rules from '../rules/rules';
import start from '../start/start';

declare const global: {
	game?: Game;
};

// Starts hardware and runs game.  Game is just a collection of rules that apply on each button change.
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

	const {
		buttons: buttonState,
		enableOrDisableFlippers,
		tapCoil,
		updateLights,
	} = await start({ hardware, onButtonChange });

	const startTurn = () => {
		const { log } = game;
		game.turnStartTimeInMilliseconds = Date.now();
		game.buttonsPressedThisTurn.length = 0;
		game.modeStepButtonsHitThisTurn.length = 0;
		log('started next turn');
	};

	let playerOneInitials = localStorage.getItem('playerOneInitials') || Array(initialsLength).fill('A').join('');
	let playerTwoInitials = localStorage.getItem('playerTwoInitials') || Array(initialsLength).fill('B').join('');

	const player1: Player = {
		score: 0,
		ballsTotal: startingBallsPerPlayer,
		ballsUsed: 0,
		get initials() {
			return playerOneInitials;
		},
		set initials(value) {
			playerOneInitials = value;
			localStorage.setItem('playerOneInitials', playerOneInitials);
		},
	};

	const player2: Player = {
		score: 0,
		ballsTotal: startingBallsPerPlayer,
		ballsUsed: 0,
		get initials() {
			return playerTwoInitials;
		},
		set initials(value) {
			playerTwoInitials = value;
			localStorage.setItem('playerTwoInitials', playerTwoInitials);
		},
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

	let volume = parseFloat(localStorage.getItem('volume') || '1');
	let song = 0;
	let songAudio: HTMLAudioElement | undefined = undefined;

	const getSongVolume = () => {
		return volume * (game?.status === 'waitingForLaunch' ? 0.25 : 1);
	};

	const playSong = () => {
		if (songAudio) {
			songAudio.pause();
			songAudio.remove();
		}
		songAudio = new Audio(`audio/${songs[song]}.mp3`);
		songAudio.volume = getSongVolume();
		songAudio.play();
		songAudio.addEventListener('ended', () => {
			if (song === songs.length - 1) {
				song = 0;
			} else {
				song++;
			}
			playSong();
		});
	};
	playSong();

	const addPlayer = () => {
		const { players } = game;
		if (players.length < maxPlayers) {
			players.push(player2);
		}
	};

	const highScores = ((): HighScore[] => {
		try {
			const highScores = localStorage.getItem('HighScores');
			return highScores ? (JSON.parse(highScores) as HighScore[]) : [];
		} catch {
			return [];
		}
	})();

	const endGame = () => {
		const { players } = game;
		game.status = 'gameOver';
		game.showingMenu = 'options';
		game.selectedMenuOption = OptionsMenuOption.lastGame;
		game.showingMenuDetails = true;

		players.forEach((player) => {
			const { initials, score } = player;
			const highScoreIndex = highScores.findIndex((highScore) => highScore.score < score);
			if (highScoreIndex !== -1) {
				highScores.splice(highScoreIndex, 0, { initials, score });
			} else if (highScores.length < 10) {
				highScores.push({ initials, score });
			}
			localStorage.setItem('HighScores', JSON.stringify(highScores));
		});
	};

	let status: Status = 'starting';
	const history: string[] = [];
	const game: Game = {
		selectedMenuOption: SelectedGameSetupMenuOption.numberOfPlayers,
		nextPlayer,
		startNextGame,
		log: (message) => {
			history.push(message);
			console.log('log:', message);
		},
		history,
		kickersWithBalls: [],
		get currentModeStep() {
			return getCurrentModeStep();
		},
		currentMode: modes[0],
		buttonsPressedThisTurn: [],
		modeStepButtonsHitThisTurn: [],
		turnStartTimeInMilliseconds: 0,
		ballsInPlay: 0,
		get status() {
			return status;
		},
		set status(value) {
			status = value;
			if (songAudio) {
				songAudio.volume = getSongVolume();
			}
		},
		error: '',
		credits: 0,
		players: [player1, player2],
		currentPlayer: player1,
		pressedButtons: [],
		pressedButton: undefined,
		unpressedButton: undefined,
		get song() {
			return song;
		},
		set song(value) {
			song = value;
			playSong();
		},
		enableOrDisableFlippers,
		tapCoil,
		startTurn,
		showingMenu: undefined,
		get volume() {
			return volume;
		},
		set volume(value) {
			volume = value;
			if (songAudio) {
				songAudio.volume = getSongVolume();
			}
			localStorage.setItem('volume', volume.toString());
		},
		showingMenuDetails: false,
		lights: 'on',
		addPlayer,
		get creditsRequired() {
			return this.players.length * creditsPerPlayer;
		},
		get creditsNeeded() {
			return this.creditsRequired - this.credits;
		},
		shots: [],
		highScores,
		endGame,
		updateLights,
	};

	let inactiveTimeout: number | undefined = undefined;

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

		const lightUpdate = lightUpdater({ game });

		rules.forEach((rule) => rule({ game }));

		lightUpdate.update();

		onUpdate({ game });

		if (inactiveTimeout) {
			clearTimeout(inactiveTimeout);
			inactiveTimeout = undefined;
		}

		// Game setup menu is hidden after 10 seconds of inactivity.
		if (game.status !== 'playing' && game.status !== 'waitingForLaunch' && game.status !== 'waitingForNextPlayer') {
			if (game.showingMenu === 'game-setup') {
				inactiveTimeout = window.setTimeout(() => {
					game.showingMenu = undefined;
					game.log('closed game setup because of inactivity');
					runRules();
				}, 10 * 1000);
			}
		}

		// For debugging needs -- makes it easy to inspect game state in browser console.
		global.game = game;
	};

	runRules();
};

export default run;
