import { targetButtons } from '../const/buttons/buttons';
import Game from '../entities/Game';

let blinkInterval: number | undefined = undefined;
let blinkOn = false;

const lightUpdater = ({ game: previousGame }: { game: Game }) => {
	const { status: previousStatus, currentModeStep } = previousGame;
	const previousModeStepName = currentModeStep?.name;

	const previousmModeStepTargetButtons = previousGame.currentModeStep?.buttons.filter(
		(button) =>
			!previousGame.modeStepButtonsHitThisTurn.some((b) => b.id === button.id) &&
			!previousGame.kickersWithBalls.some((kicker) => kicker.button.id === button.id)
	);

	const update = ({ game }: { game: Game }) => {
		// If the current mode step changes, we need to update blinking lights.
		if (game.currentModeStep?.name !== previousModeStepName) {
			// We always reset the blink interval so that the first blink will happen at a consistent time.
			if (blinkInterval !== undefined) {
				clearInterval(blinkInterval);
				blinkOn = false;
				blinkInterval = undefined;
			}

			// Update previously blinking lights to the correct solid state:
			//  They are on if hit this turn, otherwise off.
			if (previousmModeStepTargetButtons?.length) {
				game.updateLights({
					updates: previousmModeStepTargetButtons.map((button) => {
						const colorPercent = game.buttonsPressedThisTurn.some((b) => b.id === button.id) ? 1 : 0;
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
			const modeStepTargetButtons = game.currentModeStep?.buttons.filter(
				(button) =>
					!game.modeStepButtonsHitThisTurn.some((b) => b.id === button.id) &&
					!game.kickersWithBalls.some((kicker) => kicker.button.id === button.id)
			);
			if (modeStepTargetButtons?.length) {
				const fadeDurationInMilliseconds = 500;

				const blink = async () => {
					const colorPercent = blinkOn ? 1 : 0;
					blinkOn = !blinkOn;
					game.updateLights({
						updates: modeStepTargetButtons.map((button) => ({
							id: button.lightId,
							redPercent: colorPercent,
							greenPercent: colorPercent,
							bluePercent: colorPercent,
							fadeDurationInMilliseconds,
						})),
					});
				};

				blinkInterval = window.setInterval(blink, fadeDurationInMilliseconds * 1.5);
				blink();
			}
		}

		// Turn light on when a target button is pressed.
		const pressedTargetButton =
			game.pressedButton && targetButtons.find((button) => button.id === game.pressedButton?.id);
		if (pressedTargetButton) {
			const fadeDurationInMilliseconds = 100;
			game.updateLights({
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
		if (previousStatus !== game.status) {
			if (game.status === 'gameOver' || game.status === 'waitingForNextPlayer') {
				const fadeDurationInMilliseconds = 100;
				game.updateLights({
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
