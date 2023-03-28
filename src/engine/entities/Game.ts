import Button from './Button';
import Coil from './Coil';
import HighScore from './HighScore';
import Kicker from './Kicker';
import Mode from './Mode';
import ModeStep from './ModeStep';
import Player from './Player';
import Shot from './Shot';

export declare type Status =
	| 'starting'
	| 'readyToPlay'
	| 'playing'
	| 'waitingForLaunch'
	| 'gameOver'
	| 'waitingForNextPlayer';

export const SelectedGameSetupMenuOption = {
	numberOfPlayers: -1,
};

export const minGameSetupMenuOption = SelectedGameSetupMenuOption.numberOfPlayers;

export const OptionsMenuOption = {
	viewHighScores: 0,
	lastGame: 1,
	song: 2,
	volume: 3,
	lights: 4,
};

export const maxOptionsMenuOption = OptionsMenuOption.lights;

export default interface Game {
	log: (message: string) => void;
	history: string[];
	currentMode: Mode;
	readonly currentModeStep: ModeStep | undefined;
	turnStartTimeInMilliseconds: number;
	ballsInPlay: number;
	error: string;
	status: Status;
	credits: number;
	players: Player[];
	currentPlayer: Player;
	pressedButtons: Button[];
	pressedButton: Button | undefined;
	unpressedButton: Button | undefined;
	buttonsPressedThisTurn: Button[];
	modeStepButtonsHitThisTurn: Button[];
	kickersWithBalls: Kicker[];
	enableOrDisableFlippers: (args: { enable: boolean }) => void;
	tapCoil: (args: { coil: Coil }) => void;
	startTurn: () => void;
	startNextGame: () => void;
	nextPlayer: () => void;
	song: number;
	showingMenu: 'options' | 'game-setup' | 'not-ready-to-start' | undefined;
	selectedMenuOption: number;
	volume: number;
	showingMenuDetails: boolean;
	lights: 'on' | 'dim' | 'off';
	addPlayer: () => void;
	endGame: () => void;
	readonly creditsRequired: number;
	readonly creditsNeeded: number;
	readonly shots: Shot[];
	readonly highScores: HighScore[];
}
