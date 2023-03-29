import { bumpers } from '../const/bumpers/bumpers';
import buttons from '../const/buttons/buttons';
import { troughBallEjectCoil } from '../const/coils/coils';
import flippers, { FlipperInfo } from '../const/flippers/flippers';
import { kickers } from '../const/kickers/kickers';
import { slingshots } from '../const/slingshots/slingshots';
import Bumper from '../entities/Bumper';
import Coil from '../entities/Coil';
import Hardware from '../entities/Hardware';
import Kicker from '../entities/Kicker';
import Slingshot from '../entities/Slingshot';

// Starts hardware and does initial configuration.
const start = async (args: {
	hardware: Hardware;
	onButtonChange: (args: { buttonId: number; closed: boolean }) => Promise<void>;
}) => {
	const { onButtonChange, hardware } = args;

	const {
		configureAutoTriggeredDiverter,
		configurePulse,
		latch,
		modifyTrigger,
		buttons: buttonState,
		updateLights,
	} = await hardware({
		maxButtonId: Math.max(...buttons.map((button) => button.id)),
		onButtonChange,
	});

	const enableOrDisableCoil = async (args: { enable: boolean; coil: Coil }) => {
		const { enable, coil } = args;
		await modifyTrigger({ coilId: coil.id, control: enable ? 'auto' : 'off' });
	};

	const tapCoil = async (args: { coil: Coil }) => {
		const { coil } = args;
		await modifyTrigger({ coilId: coil.id, control: 'tap' });
	};

	let flippersEnabled = true;
	const enableOrDisableFlippers = async (args: { enable: boolean }) => {
		const { enable } = args;
		if (flippersEnabled === enable) {
			return;
		}
		flippersEnabled = enable;
		for (const flipper of flippers) {
			await enableOrDisableCoil({ enable, coil: flipper.mainCoil });
			await enableOrDisableCoil({ enable, coil: flipper.holdCoil });
		}
	};

	const disableFlippers = async () => {
		await enableOrDisableFlippers({ enable: false });
	};

	const configureFlipper = async (args: { flipper: FlipperInfo }) => {
		const { flipper } = args;
		const { buttonButton, endOfStrokeButton, holdCoil, mainCoil } = flipper;

		// Configure Main Coil
		await configureAutoTriggeredDiverter({
			coilId: mainCoil.id,
			trigger: {
				enterButtonCondition: !buttonButton.normallyClosed,
				exitButtonCondition: !endOfStrokeButton.normallyClosed,
			},
			enterButtonId: buttonButton.id,
			exitButtonId: endOfStrokeButton.id,
			fullPowerTimeInMilliseconds: 15,
			partialPowerPercent: 0,
			partialPowerTimeInDeciseconds: 0,
			restTimeInMilliseconds: 90,
		});

		// Configure Hold Coil
		//  I don't understand why these need to be exactly this way, but most other variations cause coil to buzz.
		//  I would think kick power and time should be 0, and latch power could be less than 100%, but does not work.
		await latch({
			coilId: holdCoil.id,
			kickPowerPercent: 1,
			kickTimeInMilliseconds: 10,
			latchPowerPercent: 1,
			restTimeInMilliseconds: 90,
			buttonCondition: !buttonButton.normallyClosed,
			buttonId: buttonButton.id,
		});
	};

	const configureSlingshot = async (args: { slingshot: Slingshot }) => {
		const { slingshot } = args;
		const { coil, button } = slingshot;

		await configurePulse({
			coilId: coil.id,
			buttonId: button.id,
			buttonCondition: !button.normallyClosed,
			pulsePowerPercent: 0.6,
			pulseTimeInMilliseconds: 30,
			restTimeInMilliseconds: 90,
		});
	};

	const configureKicker = async (args: { kicker: Kicker }) => {
		const { kicker } = args;
		const { coil, button } = kicker;

		await configurePulse({
			coilId: coil.id,
			pulsePowerPercent: 1,
			pulseTimeInMilliseconds: 30,
			restTimeInMilliseconds: 90,
		});

		// The most common and easiest to fix issue that can cause a stuck ball is a ball being
		//  in a kicker when the system is shutdown (game not finished).  If kicker has a ball
		//  at startup, we kick it out now, to get game ready for play ASAP.
		const kickerButton = buttonState.find((b) => button.id === b.id);
		if (kickerButton && kickerButton.closed !== !!button.normallyClosed) {
			tapCoil({ coil });
		}
	};

	const configureManualCoil = async (args: { coil: Coil }) => {
		const { coil } = args;

		await configurePulse({
			coilId: coil.id,
			pulsePowerPercent: 0.8,
			pulseTimeInMilliseconds: 90,
			restTimeInMilliseconds: 90,
		});
	};

	const configureBumper = async (args: { bumper: Bumper }) => {
		const { bumper } = args;
		const { coil, button } = bumper;

		await configurePulse({
			coilId: coil.id,
			buttonId: button.id,
			buttonCondition: !button.normallyClosed,
			pulsePowerPercent: 1,
			pulseTimeInMilliseconds: 30,
			restTimeInMilliseconds: 90,
		});
	};

	for (const flipper of flippers) {
		await configureFlipper({ flipper });
	}

	for (const slingshot of slingshots) {
		await configureSlingshot({ slingshot });
	}

	for (const kicker of kickers) {
		await configureKicker({ kicker });
	}

	for (const bumper of bumpers) {
		await configureBumper({ bumper });
	}

	await configureManualCoil({ coil: troughBallEjectCoil });

	await disableFlippers();

	return {
		enableOrDisableFlippers,
		tapCoil,
		buttons: buttonState,
		updateLights,
	};
};

export default start;
