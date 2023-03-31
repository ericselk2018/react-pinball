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
			durationInMilliseconds: 1000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: green,
			startTimeInMilliseconds: 100,
			durationInMilliseconds: 1000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 200,
			durationInMilliseconds: 1000,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: red,
			startTimeInMilliseconds: 1050,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: green,
			startTimeInMilliseconds: 1350,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 1650,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 1700,
			durationInMilliseconds: 1000,
			lights: lightsInClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: green,
			startTimeInMilliseconds: 1800,
			durationInMilliseconds: 1000,
			lights: lightsInClockwiseOrder,
		}),
		...createLinearLightShowSteps({
			color: red,
			startTimeInMilliseconds: 1900,
			durationInMilliseconds: 1000,
			lights: lightsInClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: blue,
			startTimeInMilliseconds: 2950,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: green,
			startTimeInMilliseconds: 3250,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
		...createFlashLightShowSteps({
			color: red,
			startTimeInMilliseconds: 3550,
			durationInMilliseconds: 250,
			lights: lightsInCounterClockwiseOrder,
		}),
	],
};

export default debonaireLightShow;
