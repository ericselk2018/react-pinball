import Slingshot from '@/engine/entities/Slingshot';
import { leftSlingshotButton, rightSlingshotButton } from '../buttons/buttons';
import { leftSlingshotCoil, rightSlingshotCoil } from '../coils/coils';

export const leftSlingshot: Slingshot = {
	button: leftSlingshotButton,
	coil: leftSlingshotCoil,
};

export const rightSlingshot: Slingshot = {
	button: rightSlingshotButton,
	coil: rightSlingshotCoil,
};

export const slingshots: ReadonlyArray<Slingshot> = [leftSlingshot, rightSlingshot];
