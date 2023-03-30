import Game from '../entities/Game';
import LightShow from '../entities/LightShow';

// Plays a given show until abort signal is aborted.
// Optional onRepeat callback can be used to abort after one play if looping is not desired.
const lightShow = (args: {
	game: Game;
	show: LightShow;
	abortSignal: AbortSignal;
	onRepeat?: () => void;
	startTimeInMilliseconds?: number;
}) => {
	const { show, game, abortSignal, onRepeat } = args;
	const { steps, repeatAfterMilliseconds } = show;
	const { updateLights } = game;

	if (!steps.length) {
		return;
	}

	let startTimeInMilliseconds = performance.now();
	let previousFrameTimeInMilliseconds = startTimeInMilliseconds - 1;

	const lastStepTimeInMilliseconds = [...steps].sort((a, b) => b.timeInMilliseconds - a.timeInMilliseconds)[0]
		.timeInMilliseconds;
	const repeatTimeInMilliseconds = lastStepTimeInMilliseconds + repeatAfterMilliseconds;

	// If caller wants us to start at a specific time in the show, instead of the start...
	if (args.startTimeInMilliseconds) {
		// The spot we will actually start at is the correct position wrapped based on the repeat/loop time.
		const startAtMilliseconds = args.startTimeInMilliseconds % repeatTimeInMilliseconds;

		// We move start time backwards to have the impact of acting like we started playing a while ago,
		//  which makes all of our other logic fast-forward/jump to the correct start position.
		startTimeInMilliseconds -= startAtMilliseconds;
	}

	const frame = (frameTimeInMilliseconds: number) => {
		if (abortSignal.aborted) {
			return;
		}

		const thisFrameTimeSinceStartInMilliseconds = frameTimeInMilliseconds - startTimeInMilliseconds;
		const previousFrameTimeSinceStartInMilliseconds = previousFrameTimeInMilliseconds - startTimeInMilliseconds;

		if (thisFrameTimeSinceStartInMilliseconds > repeatTimeInMilliseconds) {
			startTimeInMilliseconds = frameTimeInMilliseconds;
			previousFrameTimeInMilliseconds = startTimeInMilliseconds - 1;
			onRepeat?.();
			frame(frameTimeInMilliseconds);
			return;
		}

		const frameSteps = steps.filter(
			(step) =>
				step.timeInMilliseconds > previousFrameTimeSinceStartInMilliseconds &&
				step.timeInMilliseconds <= thisFrameTimeSinceStartInMilliseconds
		);

		if (frameSteps.length) {
			updateLights({
				updates: frameSteps.map((step) => ({
					id: step.light.id,
					redPercent: step.color.redPercent,
					greenPercent: step.color.greenPercent,
					bluePercent: step.color.bluePercent,
					fadeDurationInMilliseconds: step.fadeDurationInMilliseconds,
				})),
			});
		}

		previousFrameTimeInMilliseconds = frameTimeInMilliseconds;

		requestAnimationFrame(frame);
	};

	requestAnimationFrame(frame);
};

export default lightShow;
