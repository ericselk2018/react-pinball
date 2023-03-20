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
export const leftMiddleRolloverButton: TargetButton = {
	id: id(6),
	name: 'Left Middle Rollover',
	normallyClosed: true,
	image: 'images/dom.jpg',
	videos: ['videos/dom1.mp4'],
	dificulty: 0.9,
};
export const fourTargetGroupTopButton: TargetButton = {
	id: id(7),
	name: '4-Target Group - Top',
	image: 'images/dom.jpg',
	videos: ['videos/dom1.mp4'],
	dificulty: 0.5,
};

id = (pin: number) => buttonId({ board: lowerThirdNodeBoard, header: 1, pin });
export const fourTargetGroupBottomButton: TargetButton = {
	id: id(0),
	name: '4-Target Group - Bottom',
	image: 'images/letty.jpg',
	videos: ['videos/letty1.mp4'],
	dificulty: 0.5,
};
export const fourTargetGroupSecondFromBottomButton: TargetButton = {
	id: id(1),
	name: '4-Target Group - 2nd From Bottom',
	image: 'images/mia.jpg',
	videos: ['videos/mia1.mp4'],
	dificulty: 0.5,
};
export const fourTargetGroupSecondFromTopButton: TargetButton = {
	id: id(2),
	name: '4-Target Group - 2nd From Top',
	image: 'images/brian.jpg',
	videos: ['videos/brian1.mp4'],
	dificulty: 0.5,
};
export const troughBallOneButton: Button = { id: id(3), name: 'Trough Ball 1', normallyClosed: true, dificulty: 0 };
export const troughJamButton: Button = { id: id(4), name: 'Trough Jam', normallyClosed: true, dificulty: 0 };
export const troughBallTwoButton: Button = { id: id(5), name: 'Trough Ball 2', normallyClosed: true, dificulty: 0 };
export const troughBallThreeButton: Button = { id: id(6), name: 'Trough Ball 3', normallyClosed: true, dificulty: 0 };
export const troughBallFourButton: Button = { id: id(7), name: 'Trough Ball 4', normallyClosed: true, dificulty: 0 };

id = (pin: number) => buttonId({ board: lowerThirdNodeBoard, header: 2, pin });
export const troughBallFiveButton: Button = { id: id(0), name: 'Trough Ball 5', normallyClosed: true, dificulty: 0 };
export const plungerRolloverButton: Button = {
	id: id(1),
	name: 'Plunger Rollover',
	normallyClosed: true,
	dificulty: 0,
};

id = (pin: number) => buttonId({ board: upperThirdNodeBoard, header: 0, pin });
export const middleBumperButton: Button = { id: id(0), name: 'Middle Bumper', dificulty: 0.7 };
export const leftBumperButton: Button = { id: id(1), name: 'Left Bumper', dificulty: 0.9 };
export const topRolloverInsideButton: Button = {
	id: id(2),
	name: 'Top Rollover Inside',
	normallyClosed: true,
	dificulty: 1,
};
export const topRolloverOutsideButton: Button = {
	id: id(3),
	name: 'Top Rollover Outside',
	normallyClosed: true,
	dificulty: 0.6,
};
export const topLeftTargetButton: TargetButton = {
	id: id(4),
	name: 'Top Left Target',
	image: 'images/garage1.jpg',
	videos: ['videos/garage1.mp4'],
	dificulty: 1,
};
export const leftKickerButton: TargetButton = {
	id: id(5),
	name: 'Left Kicker',
	normallyClosed: true,
	image: 'images/garage2.jpg',
	videos: ['videos/garage2.mp4'],
	dificulty: 0.8,
};

id = (pin: number) => buttonId({ board: upperThirdNodeBoard, header: 1, pin });
export const rightKickerButton: TargetButton = {
	id: id(0),
	name: 'Right Kicker',
	normallyClosed: true,
	image: 'images/garage3.jpg',
	videos: ['videos/garage3.mp4'],
	dificulty: 0.8,
};
export const rightTargetButton: TargetButton = {
	id: id(1),
	name: 'Right Target',
	image: 'images/garage4.jpg',
	videos: ['videos/garage4.mp4'],
	dificulty: 0.5,
};
export const rightBumperButton: Button = { id: id(2), name: 'Right Bumper', dificulty: 0.7 };
export const middleKickerButton: TargetButton = {
	id: id(3),
	name: 'Middle Kicker',
	normallyClosed: true,
	image: 'images/garage4.jpg',
	videos: ['videos/domHome1.mp4'],
	dificulty: 0.9,
};
export const topKickerButton: TargetButton = {
	id: id(4),
	name: 'Top Kicker',
	normallyClosed: true,
	image: 'images/garage1.jpg',
	videos: ['videos/domHome1.mp4'],
	dificulty: 0.9,
};
export const threeTargetGroupOutsideButton: TargetButton = {
	id: id(5),
	name: '3-Target Group - Outside',
	image: 'images/charger.jpg',
	videos: ['videos/charger1.mp4'],
	dificulty: 0.5,
};
export const threeTargetGroupCenterButton: TargetButton = {
	id: id(6),
	name: '3-Target Group - Center',
	image: 'images/skyline.jpg',
	videos: ['videos/skyline1.mp4'],
	dificulty: 0.5,
};
export const threeTargetGroupInsideButton: TargetButton = {
	id: id(7),
	name: '3-Target Group - Inside',
	image: 'images/miacar.jpg',
	videos: ['videos/miacar.mp4'],
	dificulty: 0.5,
};

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
	fourTargetGroupSecondFromTopButton,
	fourTargetGroupSecondFromBottomButton,
	fourTargetGroupBottomButton,
];
export const carButtons: ReadonlyArray<TargetButton> = [
	threeTargetGroupOutsideButton,
	threeTargetGroupCenterButton,
	threeTargetGroupInsideButton,
];
export const truckButtons: ReadonlyArray<TargetButton> = [topLeftTargetButton];
export const stuntButtons: ReadonlyArray<TargetButton> = [leftMiddleRolloverButton];
export const kickerButtons: ReadonlyArray<TargetButton> = [
	leftKickerButton,
	middleKickerButton,
	topKickerButton,
	rightKickerButton,
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
	leftMiddleRolloverButton,
	fourTargetGroupTopButton,
	fourTargetGroupBottomButton,
	fourTargetGroupSecondFromBottomButton,
	fourTargetGroupSecondFromTopButton,
	troughBallOneButton,
	troughJamButton,
	troughBallTwoButton,
	troughBallThreeButton,
	troughBallFourButton,
	troughBallFiveButton,
	plungerRolloverButton,
	middleBumperButton,
	leftBumperButton,
	topRolloverInsideButton,
	topRolloverOutsideButton,
	topLeftTargetButton,
	leftKickerButton,
	rightKickerButton,
	rightTargetButton,
	rightBumperButton,
	middleKickerButton,
	topKickerButton,
	threeTargetGroupOutsideButton,
	threeTargetGroupCenterButton,
	threeTargetGroupInsideButton,
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
