import ComboShot from '@/engine/entities/ComboShot';
import {
	fourTargetGroupBottomButton,
	fourTargetGroupFirstFromBottomButton,
	fourTargetGroupFirstFromTopButton,
	fourTargetGroupTopButton,
	leftBumperButton,
	middleBumperButton,
	rightBumperButton,
	threeTargetGroupCenterButton,
	threeTargetGroupLeftButton,
	threeTargetGroupRightButton,
} from '../buttons/buttons';

const bumperMania: ComboShot = {
	name: 'Bumper Mania',
	buttons: [leftBumperButton, middleBumperButton, rightBumperButton],
	videos: [],
	dificulty: 3,
};

const carCrazy: ComboShot = {
	name: 'Car Crazy',
	buttons: [threeTargetGroupLeftButton, threeTargetGroupCenterButton, threeTargetGroupRightButton],
	videos: [],
	dificulty: 12,
};

const teamPlayer: ComboShot = {
	name: 'Team Player',
	buttons: [
		fourTargetGroupTopButton,
		fourTargetGroupFirstFromTopButton,
		fourTargetGroupFirstFromBottomButton,
		fourTargetGroupBottomButton,
	],
	videos: [],
	dificulty: 18,
};

const comboShots: ComboShot[] = [bumperMania, carCrazy, teamPlayer];

export default comboShots;
