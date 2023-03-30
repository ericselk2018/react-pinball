import { off } from '@/engine/const/colors/colors';
import Color from '@/engine/entities/Color';
import Light from '@/engine/entities/Light';
import LightShowStep from '@/engine/entities/LightShowStep';

// Create a linear pattern light show step using a single color and series of lights in order.
// The final light will turn on at the duration time -- it will turn off slightly after the duration time.
export const createLinearLightShowSteps = (args: {
	color: Color;
	durationInMilliseconds: number;
	lights: Light[];
	startTimeInMilliseconds: number;
}): LightShowStep[] => {
	const { color, durationInMilliseconds, lights, startTimeInMilliseconds } = args;
	const timePerLightInMilliseconds = durationInMilliseconds / lights.length;
	const fadeDurationInMilliseconds = timePerLightInMilliseconds;
	return lights.reduce((steps, light, lightIndex) => {
		const timeInMilliseconds = timePerLightInMilliseconds * lightIndex + startTimeInMilliseconds;
		steps.push({
			color,
			fadeDurationInMilliseconds,
			light,
			timeInMilliseconds,
		});

		// Turn the previous light off as we turn each additional light on.
		if (lightIndex > 0) {
			steps.push({
				color: off,
				fadeDurationInMilliseconds,
				light: lights[lightIndex - 1],
				timeInMilliseconds,
			});
		}

		// For the last light, add an extra step to turn it off.
		if (lightIndex === lights.length - 1) {
			steps.push({
				color: off,
				fadeDurationInMilliseconds,
				light: light,
				timeInMilliseconds: timeInMilliseconds + timePerLightInMilliseconds,
			});
		}

		return steps;
	}, [] as LightShowStep[]);
};
