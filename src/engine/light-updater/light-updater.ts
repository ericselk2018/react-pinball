import { targetButtons } from '../const/buttons/buttons';
import Game from '../entities/Game';

const lightUpdater = ({ game }: { game: Game }) => {
	const { buttonsPressedThisTurn, currentModeStep, modeStepButtonsHitThisTurn, pressedButton, updateLights, status } =
		game;

	let blinkInterval: number | undefined = undefined;
	let blinkOn = false;

	const previousmModeStepTargetButtons = currentModeStep?.buttons.filter(
		(button) => !modeStepButtonsHitThisTurn.some((b) => b.id === button.id)
	);

	const update = () => {
		// If the current mode step changes, we need to update blinking lights.
		if (game.currentModeStep?.name !== currentModeStep?.name) {
			// We always reset the blink interval so that the first blink will happen at a consistent time.
			if (blinkInterval !== undefined) {
				clearInterval(blinkInterval);
				blinkOn = false;
				blinkInterval = undefined;
			}

			// Update previously blinking lights to the correct solid state:
			//  They are on if hit this turn, otherwise off.
			if (previousmModeStepTargetButtons?.length) {
				updateLights({
					updates: previousmModeStepTargetButtons.map((button) => {
						const colorPercent = buttonsPressedThisTurn.some((b) => b.id === button.id) ? 1 : 0;
						const fadeDurationInMilliseconds = 100;
						return {
							id: button.lightId,
							redPercent: colorPercent,
							greenPercent: colorPercent,
							bluePercent: colorPercent,
							fadeDurationInMilliseconds,
						};
					}),
				});
			}

			// If we have mode step targets, we start an interval to make them blink.
			const modeStepTargetButtons = currentModeStep?.buttons.filter(
				(button) => !modeStepButtonsHitThisTurn.some((b) => b.id === button.id)
			);
			if (modeStepTargetButtons?.length) {
				const fadeDurationInMilliseconds = 500;
				setInterval(() => {
					const colorPercent = blinkOn ? 1 : 0;
					blinkOn = !blinkOn;
					updateLights({
						updates: modeStepTargetButtons.map((button) => ({
							id: button.lightId,
							redPercent: colorPercent,
							greenPercent: colorPercent,
							bluePercent: colorPercent,
							fadeDurationInMilliseconds,
						})),
					});
				}, fadeDurationInMilliseconds * 1.5);
			}
		}

		// Turn light on when a target button is pressed.
		const pressedTargetButton = pressedButton && targetButtons.find((button) => button.id === pressedButton.id);
		if (pressedTargetButton) {
			const fadeDurationInMilliseconds = 100;
			updateLights({
				updates: [
					{
						id: pressedTargetButton.lightId,
						redPercent: 1,
						greenPercent: 1,
						bluePercent: 1,
						fadeDurationInMilliseconds,
					},
				],
			});
		}

		// Turn off all lights when a turn is over.
		if (status !== game.status) {
			if (game.status === 'gameOver' || game.status === 'waitingForNextPlayer') {
				const fadeDurationInMilliseconds = 100;
				updateLights({
					updates: targetButtons.map((button) => ({
						id: button.lightId,
						redPercent: 0,
						greenPercent: 0,
						bluePercent: 0,
						fadeDurationInMilliseconds,
					})),
				});
			}
		}
	};

	return { update };
};

export default lightUpdater;
