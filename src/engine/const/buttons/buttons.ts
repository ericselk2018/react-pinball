import Button from '@/engine/entities/Button';
import TargetButton from '@/engine/entities/TargetButton';
import { buttonId } from '@/lib/id/id';
import { cabinetNodeBoard, lowerThirdNodeBoard, upperThirdNodeBoard } from '../node-boards/node-boards';
import { totalBallsInMachine } from '../setup/setup';

declare type PinNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Buttons are groupped by board and sorted by header and pin.
// This is to assist in wiring and finding available pins.
let id = (pin: PinNumber) => buttonId({ board: lowerThirdNodeBoard, header: 0, pin });
export const leftFlipperEndOfStrokeButton: Button = {
	id: id(0),
	name: 'Left Flipper End of Stroke',
	dificulty: 0,
};
export const leftSlingshotButton: Button = {
	id: id(1),
	name: 'Left Slingshot',
	dificulty: 0.5,
};
export const leftRolloverButton: Button = {
	id: id(2),
	name: 'Left Rollover',
	normallyClosed: true,
	dificulty: 0.7,
};
export const rightFlipperEndOfStrokeButton: Button = {
	id: id(3),
	name: 'Right Flipper End of Stroke',
	dificulty: 0,
};
export const rightSlingshotButton: Button = {
	id: id(4),
	name: 'Right Slingshot',
	dificulty: 0.5,
};
export const rightRolloverButton: Button = {
	id: id(5),
	name: 'Right Rollover',
	normallyClosed: true,
	dificulty: 0.7,
};
export const rightKickerButton: TargetButton = {
	id: id(6),
	name: 'Right Kicker',
	normallyClosed: true,
	image: 'images/garage3.jpg',
	videos: ['videos/garage3.mp4'],
	dificulty: 0.8,
	lightId: 100,
};
export const rightBumperButton: Button = { id: id(7), name: 'Right Bumper', dificulty: 0.7 };

id = (pin: number) => buttonId({ board: lowerThirdNodeBoard, header: 1, pin });
export const fourTargetGroupFirstFromBottomButton: TargetButton = {
	id: id(0),
	name: '4-Target Group - 1st From Bottom',
	image: 'images/mia.jpg',
	videos: ['videos/mia1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const leftBumperButton: Button = { id: id(1), name: 'Left Bumper', dificulty: 0.9 };
export const fourTargetGroupTopButton: TargetButton = {
	id: id(2),
	name: '4-Target Group - Top',
	image: 'images/dom.jpg',
	videos: ['videos/dom1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const fourTargetGroupBottomButton: TargetButton = {
	id: id(3),
	name: '4-Target Group - Bottom',
	image: 'images/letty.jpg',
	videos: ['videos/letty1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const fourTargetGroupFirstFromTopButton: TargetButton = {
	id: id(4),
	name: '4-Target Group - 1st From Top',
	image: 'images/brian.jpg',
	videos: ['videos/brian1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};

// Header 2 on lower third node board is available, not used for anything.
// id = (pin: number) => buttonId({ board: lowerThirdNodeBoard, header: 2, pin });

id = (pin: number) => buttonId({ board: lowerThirdNodeBoard, header: 3, pin });
export const troughJamButton: Button = { id: id(0), name: 'Trough Jam', normallyClosed: true, dificulty: 0 };
export const troughBallOneButton: Button = { id: id(1), name: 'Trough Ball 1', normallyClosed: true, dificulty: 0 };
export const troughBallTwoButton: Button = { id: id(2), name: 'Trough Ball 2', normallyClosed: true, dificulty: 0 };
export const troughBallThreeButton: Button = { id: id(3), name: 'Trough Ball 3', normallyClosed: true, dificulty: 0 };
export const troughBallFourButton: Button = { id: id(4), name: 'Trough Ball 4', normallyClosed: true, dificulty: 0 };
export const troughBallFiveButton: Button = { id: id(5), name: 'Trough Ball 5', normallyClosed: true, dificulty: 0 };
export const plungerRolloverButton: Button = {
	id: id(6),
	name: 'Plunger Rollover',
	normallyClosed: true,
	dificulty: 0,
};

id = (pin: number) => buttonId({ board: upperThirdNodeBoard, header: 0, pin });
export const topRightKickerButton: TargetButton = {
	id: id(0),
	name: 'Top Right Kicker',
	normallyClosed: true,
	image: 'images/garage1.jpg',
	videos: ['videos/domHome1.mp4'],
	dificulty: 0.9,
	lightId: 100,
};
export const topRightTargetButton: TargetButton = {
	id: id(1),
	name: 'Top Right Target',
	image: 'images/garage1.jpg',
	videos: ['videos/garage1.mp4'],
	dificulty: 1,
	lightId: 100,
};
export const threeTargetGroupRightButton: TargetButton = {
	id: id(2),
	name: '3-Target Group - Right',
	image: 'images/charger.jpg',
	videos: ['videos/charger1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const threeTargetGroupCenterButton: TargetButton = {
	id: id(3),
	name: '3-Target Group - Center',
	image: 'images/skyline.jpg',
	videos: ['videos/skyline1.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const threeTargetGroupLeftButton: TargetButton = {
	id: id(4),
	name: '3-Target Group - Left',
	image: 'images/miacar.jpg',
	videos: ['videos/miacar.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const topRolloverButton: TargetButton = {
	id: id(5),
	name: 'Top Rollover',
	normallyClosed: true,
	image: 'images/dom.jpg',
	videos: ['videos/dom1.mp4'],
	dificulty: 0.9,
	lightId: 100,
};

id = (pin: number) => buttonId({ board: upperThirdNodeBoard, header: 1, pin });
export const topKickerButton: TargetButton = {
	id: id(0),
	name: 'Top Kicker',
	normallyClosed: true,
	image: 'images/garage4.jpg',
	videos: ['videos/domHome1.mp4'],
	dificulty: 0.9,
	lightId: 100,
};
export const leftTargetButton: TargetButton = {
	id: id(3),
	name: 'Left Target',
	image: 'images/garage4.jpg',
	videos: ['videos/garage4.mp4'],
	dificulty: 0.5,
	lightId: 100,
};
export const leftKickerButton: TargetButton = {
	id: id(4),
	name: 'Left Kicker',
	normallyClosed: true,
	image: 'images/garage2.jpg',
	videos: ['videos/garage2.mp4'],
	dificulty: 0.8,
	lightId: 100,
};
export const middleBumperButton: Button = { id: id(5), name: 'Middle Bumper', dificulty: 0.7 };

id = (pin: number) => buttonId({ board: cabinetNodeBoard, header: 0, pin });
export const leftFlipperButtonButton: Button = { id: id(0), name: 'Left Flipper Button', dificulty: 0 };
export const rightFlipperButtonButton: Button = { id: id(1), name: 'Right Flipper Button', dificulty: 0 };
export const startButtonButton: Button = { id: id(2), name: 'Start Button', dificulty: 0 };
export const selectButtonButton: Button = { id: id(3), name: 'Select Button', dificulty: 0 };
export const tiltButton: Button = { id: id(4), name: 'Tilt', dificulty: 0 };
export const coinDoorButton: Button = { id: id(5), name: 'Coin Door', dificulty: 0 };
export const coinSlotButton: Button = { id: id(6), name: 'Coin Slot', dificulty: 0 };
export const beginTestButton: Button = { id: id(7), name: 'Begin Test', dificulty: 0 };

export const driverButtons: ReadonlyArray<TargetButton> = [
	fourTargetGroupTopButton,
	fourTargetGroupFirstFromTopButton,
	fourTargetGroupFirstFromBottomButton,
	fourTargetGroupBottomButton,
];
export const carButtons: ReadonlyArray<TargetButton> = [
	threeTargetGroupRightButton,
	threeTargetGroupCenterButton,
	threeTargetGroupLeftButton,
];
export const truckButtons: ReadonlyArray<TargetButton> = [topRightTargetButton];
export const stuntButtons: ReadonlyArray<TargetButton> = [topRolloverButton];
export const kickerButtons: ReadonlyArray<TargetButton> = [
	leftKickerButton,
	topKickerButton,
	topRightKickerButton,
	rightKickerButton,
];
export const targetButtons: ReadonlyArray<TargetButton> = [
	...driverButtons,
	...carButtons,
	...truckButtons,
	...stuntButtons,
	...kickerButtons,
];
export const bumperButtons: ReadonlyArray<Button> = [rightBumperButton, leftBumperButton, middleBumperButton];
export const troughButtons: ReadonlyArray<Button> = [
	troughBallOneButton,
	troughBallTwoButton,
	troughBallThreeButton,
	troughBallFourButton,
	troughBallFiveButton,
];
export const usedTroughButtons = troughButtons.slice(0, totalBallsInMachine);
export const lastTroughButton = troughButtons[troughButtons.length - 1];

// In virtual hardware mode, we need a default state, so we list Buttons that should be closed on startup here.
export const virtualClosedAtStartButtons: ReadonlyArray<Button> = [
	troughBallOneButton,
	// troughBallTwoButton,
	// troughBallThreeButton,
	// troughBallFourButton,
	// troughBallFiveButton,
];

const buttons: ReadonlyArray<Button> = [
	leftFlipperEndOfStrokeButton,
	leftSlingshotButton,
	leftRolloverButton,
	rightFlipperEndOfStrokeButton,
	rightSlingshotButton,
	rightRolloverButton,
	topRolloverButton,
	fourTargetGroupTopButton,
	fourTargetGroupBottomButton,
	fourTargetGroupFirstFromBottomButton,
	fourTargetGroupFirstFromTopButton,
	troughBallOneButton,
	troughJamButton,
	troughBallTwoButton,
	troughBallThreeButton,
	troughBallFourButton,
	troughBallFiveButton,
	plungerRolloverButton,
	middleBumperButton,
	leftBumperButton,
	topRightTargetButton,
	leftKickerButton,
	rightKickerButton,
	leftTargetButton,
	rightBumperButton,
	topKickerButton,
	topRightKickerButton,
	threeTargetGroupRightButton,
	threeTargetGroupCenterButton,
	threeTargetGroupLeftButton,
	leftFlipperButtonButton,
	rightFlipperButtonButton,
	startButtonButton,
	selectButtonButton,
	tiltButton,
	coinDoorButton,
	coinSlotButton,
	beginTestButton,
];

export default buttons;
