import soundEffects from '../const/sound-effects/sound-effects';
import Button from './Button';
import Coil from './Coil';
import ComboShot from './ComboShot';
import HighScore from './HighScore';
import Kicker from './Kicker';
import Mode from './Mode';
import ModeStep from './ModeStep';
import Player from './Player';
import Shot from './Shot';
import Song from './Song';

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
	isFreePlay: boolean;
	readonly log: (message: string) => void;
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
	comboShotTracker: { shot: ComboShot; hits: Button[] }[];
	buttonsPressedThisTurn: Button[];
	modeStepButtonsHitThisTurn: Button[];
	kickersWithBalls: Kicker[];
	readonly enableOrDisableFlippers: (args: { enable: boolean }) => void;
	readonly tapCoil: (args: { coil: Coil }) => void;
	readonly startTurn: () => void;
	readonly startNextGame: () => void;
	readonly nextPlayer: () => void;
	song: Song;
	readonly secondsSinceSongStarted: number;
	showingMenu: 'options' | 'game-setup' | 'not-ready-to-start' | undefined;
	selectedMenuOption: number;
	volume: number;
	showingMenuDetails: boolean;
	lights: 'on' | 'dim' | 'off';
	readonly addPlayer: () => void;
	readonly endGame: () => void;
	readonly creditsRequired: number;
	readonly creditsNeeded: number;
	readonly shots: Shot[];
	readonly highScores: HighScore[];
	readonly updateLights: (args: {
		updates: {
			id: number;
			redPercent: number;
			greenPercent: number;
			bluePercent: number;
			fadeDurationInMilliseconds: number;
		}[];
	}) => void;
	readonly playSoundEffect: (args: { soundEffect: keyof typeof soundEffects }) => void;
}
