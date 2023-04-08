import LightShow from '@/engine/entities/LightShow';
import { createFlashLightShowSteps, createLinearLightShowSteps } from '@/lib/lights/lights';
import { blue, green, red } from '../../colors/colors';
import { lightsInClockwiseOrder, lightsInCounterClockwiseOrder } from '../../lights/lights';

const debonaireLightShow: LightShow = {
	repeatAfterMilliseconds: 50,
	steps: [
		...createLinearLightShowSteps({
			color: red,
			startTimeInMilliseconds: 0,
			durationInMilliseconds: 2000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: green,
			startTimeInMilliseconds: 100,
			durationInMilliseconds: 2000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 200,
			durationInMilliseconds: 2000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: red,
			startTimeInMilliseconds: 2050,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: green,
			startTimeInMilliseconds: 2350,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 2650,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 2700,
			durationInMilliseconds: 2000,
			lights: lightsInClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: green,
			startTimeInMilliseconds: 2800,
			durationInMilliseconds: 2000,
			lights: lightsInClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: red,
			startTimeInMilliseconds: 2900,
			durationInMilliseconds: 2000,
			lights: lightsInClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 4950,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: green,
			startTimeInMilliseconds: 5250,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: red,
			startTimeInMilliseconds: 5550,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
	],
};

export default debonaireLightShow;
