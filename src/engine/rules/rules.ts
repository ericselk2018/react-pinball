import Rule from '../entities/Rule';
import addCredit from './add-credit/add-credit';
import awardPoints from './award-points/award-points';
import buttonPressed from './button-pressed-this-turn/button-pressed-this-turn';
import changeNumberOfPlayers from './change-number-of-players/change-number-of-players';
import changePlayerInitials from './change-player-initials/change-player-initials';
import clearKickersOnStart from './clear-kickers-on-start/clear-kickers-on-start';
import drainBall from './drain-ball/drain-ball';
import drainLastBall from './drain-last-ball/drain-last-ball';
import ejectNextBall from './eject-next-ball/eject-next-ball';
import enableOrDisableFlippers from './enable-or-disable-flippers/enable-or-disable-flippers';
import hideNotReadyToStart from './hide-not-ready-to-start/hide-not-ready-to-start';
import hideOptions from './hide-options/hide-options';
import kickBallsOnDrain from './kick-balls-on-drain/kick-balls-on-drain';
import kickOrHoldBall from './kick-or-hold-ball/kick-or-hold-ball';
import modeSelect from './mode-select/mode-select';
import modeStepHit from './mode-step-hit/mode-step-hit';
import playOnStart from './play-on-start/play-on-start';
import readyToPlay from './ready-to-play/ready-to-play';
import removeBallFromKicker from './remove-ball-from-kicker/remove-ball-from-kicker';
import selectGameSetupOption from './select-game-setup-option/select-game-setup-option';
import selectLights from './select-lights/select-lights';
import selectOption from './select-option/select-option';
import selectSong from './select-song/select-song';
import setVolume from './set-volume/set-volume';
import showGameSetup from './show-game-setup/show-game-setup';
import showNotReadyToStart from './show-not-ready-to-start/show-not-ready-to-start';
import showOptions from './show-options/show-options';
import startNextGame from './start-next-game/start-next-game';
import toggleHighScores from './toggle-high-scores/toggle-high-scores';
import toggleLastGame from './toggle-last-game/toggle-last-game';
import waitingForLaunch from './waiting-for-launch/waiting-for-launch';

// The order of rules is critical, they are run in the order they are in this array.
// Rules can modify the game state and each rule will be based on result of previous rules.
const rules: Rule[] = [
	addCredit,
	changeNumberOfPlayers,
	changePlayerInitials,
	startNextGame,
	readyToPlay,
	clearKickersOnStart,
	playOnStart,
	showNotReadyToStart,
	showGameSetup,
	waitingForLaunch,
	modeSelect,
	kickOrHoldBall,
	modeStepHit,
	buttonPressed,
	awardPoints,
	removeBallFromKicker,
	drainBall,
	kickBallsOnDrain,
	drainLastBall,
	ejectNextBall,
	enableOrDisableFlippers,
	selectOption,
	showOptions,
	selectSong,
	setVolume,
	toggleHighScores,
	toggleLastGame,
	selectLights,
	hideOptions,
	selectGameSetupOption,
	hideNotReadyToStart,
];

export default rules;
