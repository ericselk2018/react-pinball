import Rule from '../entities/Rule';
import buttonPressed from './button-pressed-this-turn/button-pressed-this-turn';
import clearKickersOnStart from './clear-kickers-on-start/clear-kickers-on-start';
import drainBall from './drain-ball/drain-ball';
import drainLastBall from './drain-last-ball/drain-last-ball';
import ejectNextBall from './eject-next-ball/eject-next-ball';
import enableOrDisableFlippers from './enable-or-disable-flippers/enable-or-disable-flippers';
import kickBallsOnDrain from './kick-balls-on-drain/kick-balls-on-drain';
import kickOrHoldBall from './kick-or-hold-ball/kick-or-hold-ball';
import modeSelect from './mode-select/mode-select';
import modeStepHit from './mode-step-hit/mode-step-hit';
import playOnStart from './play-on-start/play-on-start';
import readyToPlay from './ready-to-play/ready-to-play';
import removeBallFromKicker from './remove-ball-from-kicker/remove-ball-from-kicker';
import startNextGame from './start-next-game/start-next-game';
import waitingForLaunch from './waiting-for-launch/waiting-for-launch';

// The order of rules is critical, they are run in the order they are in this array.
// Rules can modify the game state and each rule will be based on result of previous rules.
const rules: Rule[] = [
	startNextGame,
	readyToPlay,
	clearKickersOnStart,
	playOnStart,
	waitingForLaunch,
	modeSelect,
	kickOrHoldBall,
	modeStepHit,
	buttonPressed,
	removeBallFromKicker,
	drainBall,
	kickBallsOnDrain,
	drainLastBall,
	ejectNextBall,
	enableOrDisableFlippers,
];

export default rules;
