import Button from './Button';
import Coil from './Coil';
import Kicker from './Kicker';
import Mode from './Mode';
import ModeStep from './ModeStep';
import Player from './Player';

export declare type Status =
	| 'starting'
	| 'readyToPlay'
	| 'playing'
	| 'waitingForLaunch'
	| 'gameOver'
	| 'waitingForNextPlayer';

export const Selected = {
	numberOfPlayers: -1,
};

export const minSelected = Selected.numberOfPlayers;

export default interface Game {
	selected: number;
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
}
