import Mode from '@/engine/entities/Mode';
import { carButtons, driverButtons, kickerButtons, stuntButtons, truckButtons } from '../buttons/buttons';

export const boostCarsMode: Mode = {
	name: 'Boost Car',
	video: 'videos/boost-cars.mp4',
	steps: [
		{ name: 'Select Driver', buttons: driverButtons, count: 1 },
		{ name: 'Boost Car', buttons: carButtons, count: 1 },
		{ name: 'Hide Car', buttons: kickerButtons, count: 1 },
	],
};

export const truckHeistMode: Mode = {
	name: 'Truck Heist',
	video: 'videos/truck-heist.mp4',
	steps: [
		{ name: 'Get Team', buttons: driverButtons, count: 2 },
		{ name: 'Rob Truck', buttons: truckButtons, count: 1 },
		{ name: 'Do Stunt', buttons: stuntButtons, count: 1 },
	],
};

const modes: ReadonlyArray<Mode> = [boostCarsMode, truckHeistMode];

export default modes;
