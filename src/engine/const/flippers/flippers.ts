import Button from '@/engine/entities/Button';
import Coil from '@/engine/entities/Coil';
import {
	leftFlipperButtonButton,
	leftFlipperEndOfStrokeButton,
	rightFlipperButtonButton,
	rightFlipperEndOfStrokeButton,
} from '../buttons/buttons';
import { leftFlipperMainCoil, leftFlipperHoldCoil, rightFlipperMainCoil, rightFlipperHoldCoil } from '../coils/coils';

export interface FlipperInfo {
	readonly buttonButton: Button;
	readonly endOfStrokeButton: Button;
	readonly mainCoil: Coil;
	readonly holdCoil: Coil;
}

export const leftFlipper: FlipperInfo = {
	buttonButton: leftFlipperButtonButton,
	endOfStrokeButton: leftFlipperEndOfStrokeButton,
	mainCoil: leftFlipperMainCoil,
	holdCoil: leftFlipperHoldCoil,
};

export const rightFlipper: FlipperInfo = {
	buttonButton: rightFlipperButtonButton,
	endOfStrokeButton: rightFlipperEndOfStrokeButton,
	mainCoil: rightFlipperMainCoil,
	holdCoil: rightFlipperHoldCoil,
};

const flippers: ReadonlyArray<FlipperInfo> = [leftFlipper, rightFlipper];

export default flippers;
