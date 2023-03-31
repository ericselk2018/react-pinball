import Light from '@/engine/entities/Light';

export const fourTargetGroupTopLight: Light = {
	id: 0,
};

export const fourTargetGroupFirstFromTopLight: Light = {
	id: 1,
};

export const fourTargetGroupFirstFromBottomLight: Light = {
	id: 2,
};

export const fourTargetGroupBottomLight: Light = {
	id: 3,
};

export const leftRolloverLight: Light = {
	id: 4,
};

export const leftBonusLight: Light = {
	id: 5,
};

export const middleBonusLight: Light = {
	id: 6,
};

export const rightBonusLight: Light = {
	id: 7,
};

export const rightRolloverLight: Light = {
	id: 8,
};

export const rightKickerLight: Light = {
	id: 9,
};

export const topRightKickerLight: Light = {
	id: 10,
};

export const topRightTargetLight: Light = {
	id: 11,
};

export const threeTargetGroupRightLight: Light = {
	id: 12,
};

export const threeTargetGroupCenterLight: Light = {
	id: 13,
};

export const threeTargetGroupLeftLight: Light = {
	id: 14,
};

export const topKickerLight: Light = {
	id: 15,
};

export const topRolloverLight: Light = {
	id: 16,
};

export const leftTargetLight: Light = {
	id: 17,
};

export const leftKickerLight: Light = {
	id: 18,
};

const lights: Light[] = [
	fourTargetGroupTopLight,
	fourTargetGroupFirstFromTopLight,
	fourTargetGroupFirstFromBottomLight,
	fourTargetGroupBottomLight,
	leftRolloverLight,
	leftBonusLight,
	middleBonusLight,
	rightBonusLight,
	rightRolloverLight,
	rightKickerLight,
	topRightKickerLight,
	topRightTargetLight,
	threeTargetGroupRightLight,
	threeTargetGroupCenterLight,
	threeTargetGroupLeftLight,
	topKickerLight,
	topRolloverLight,
	leftTargetLight,
	leftKickerLight,
];

// TODO: remove slice once all LEDs are wired -- waiting for out-of-stock .100 crimp connectors
export const lightsInCounterClockwiseOrder = lights.slice(0, 10);

export const lightsInClockwiseOrder = [...lightsInCounterClockwiseOrder].reverse();

export default lights;
