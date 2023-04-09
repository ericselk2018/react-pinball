import { targetButtons } from '../const/buttons/buttons';
import { startButtonLamp } from '../const/coils/coils';
import lights from '../const/lights/lights';
import Game from '../entities/Game';
import Song from '../entities/Song';
import lightShow from '../light-show/light-show';

let startBlinkInterval: number | undefined = undefined;
let blinkInterval: number | undefined = undefined;
let blinkOn = false;
let currentLightShow: { abortController: AbortController; song: Song } | undefined = undefined;

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
							id: button.light.id,
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
							id: button.light.id,
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
						id: pressedTargetButton.light.id,
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
						id: button.light.id,
						redPercent: 0,
						greenPercent: 0,
						bluePercent: 0,
						fadeDurationInMilliseconds,
					})),
				});
			}
		}

		const endLightShow = () => {
			if (currentLightShow) {
				currentLightShow.abortController.abort();
				currentLightShow = undefined;

				// Turn off all lights when show ends, so we have clean state for whatever is next.
				const fadeDurationInMilliseconds = 100;
				game.updateLights({
					updates: lights.map((light) => ({
						id: light.id,
						redPercent: 0,
						greenPercent: 0,
						bluePercent: 0,
						fadeDurationInMilliseconds,
					})),
				});
			}
		};

		// Play light show for current song while not playing.
		if (game.status === 'gameOver' || game.status === 'starting' || game.status === 'readyToPlay') {
			// If song changes we need to stop current light show.
			if (currentLightShow && currentLightShow.song !== game.song) {
				endLightShow();
			}

			if (!currentLightShow) {
				currentLightShow = {
					abortController: new AbortController(),
					song: game.song,
				};

				// Start time is based on start of song, so that light show is in sync with song (if the show itself was designed well).
				// PLAY-TEST: It might look funny if a show doesn't always start at the beginning, in which case we may need to restart
				//  the song when the light show starts, instead of starting the light show at a time that matches the already playing song.
				lightShow({
					game,
					show: currentLightShow.song.lightShow,
					abortSignal: currentLightShow.abortController.signal,
					startTimeInMilliseconds: game.secondsSinceSongStarted * 1000,
				});
			}
		} else if (currentLightShow) {
			endLightShow();
		}

		// REFACTOR: Share conditions with rules they are based on.
		const waitingToStartNextGame = game.status === 'gameOver' && !game.showingMenu;
		const waitingForNewGame =
			game.status === 'readyToPlay' && game.showingMenu === 'game-setup' && game.creditsNeeded <= 0;
		const waitingForNextPlayer = game.status === 'waitingForNextPlayer' && !game.showingMenu;
		const flashStartButton = waitingToStartNextGame || waitingForNewGame || waitingForNextPlayer;
		if (flashStartButton) {
			const blink = async () => {
				game.tapCoil({ coil: startButtonLamp });
			};
			startBlinkInterval = window.setInterval(blink, 1000);
		} else if (startBlinkInterval) {
			clearInterval(startBlinkInterval);
			startBlinkInterval = undefined;
		}
	};

	return { update };
};

export default lightUpdater;
