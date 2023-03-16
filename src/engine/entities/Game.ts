import Button from './Button';
import Coil from './Coil';
import Kicker from './Kicker';
import Mode from './Mode';
import ModeStep from './ModeStep';
import Player from './Player';
import TargetButton from './TargetButton';

export declare type Status =
	| 'starting'
	| 'readyToPlay'
	| 'playing'
	| 'waitingForLaunch'
	| 'gameOver'
	| 'waitingForNextPlayer';

export default interface Game {
	log: (message: string) => void;
	history: string[];
	currentMode: Mode;
	readonly currentModeStep: ModeStep | undefined;
	currentModeStepButtonsCompleted: TargetButton[];
	turnStartTimeInMilliseconds: number;
	ballsInPlay: number;
	error: string;
	status: Status;
	credits: number;
	players: Player[];
	currentPlayer: Player;
	pressedButtons: Button[];
	pressedButton: Button | undefined;
	buttonsPressedThisTurn: Button[];
	modeStepButtonsHitThisTurn: Button[];
	kickersWithBalls: Kicker[];
	enableOrDisableFlippers: (args: { enable: boolean }) => void;
	tapCoil: (args: { coil: Coil }) => void;
	startTurn: () => void;
}
