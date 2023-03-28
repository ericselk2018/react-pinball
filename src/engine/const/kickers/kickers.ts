import Kicker from '@/engine/entities/Kicker';
import { leftKickerButton, topKickerButton, rightKickerButton, topRightKickerButton } from '../buttons/buttons';
import { leftKickerCoil, topRightKickerCoil, topKickerCoil, rightKickerCoil } from '../coils/coils';

export const leftKicker: Kicker = {
	coil: leftKickerCoil,
	button: leftKickerButton,
};

export const topRightKicker: Kicker = {
	coil: topRightKickerCoil,
	button: topRightKickerButton,
};

export const topKicker: Kicker = {
	coil: topKickerCoil,
	button: topKickerButton,
};

export const rightKicker: Kicker = {
	coil: rightKickerCoil,
	button: rightKickerButton,
};

export const kickers: Kicker[] = [leftKicker, topRightKicker, topKicker, rightKicker];
