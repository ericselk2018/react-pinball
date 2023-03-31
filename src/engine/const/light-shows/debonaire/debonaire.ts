import LightShow from '@/engine/entities/LightShow';
import { createLinearLightShowSteps } from '@/lib/lights/lights';
import { blue, green, red } from '../../colors/colors';
import { lightsInCounterClockwiseOrder } from '../../lights/lights';

const debonaireLightShow: LightShow = {
	repeatAfterMilliseconds: 350,
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
	],
};

export default debonaireLightShow;
