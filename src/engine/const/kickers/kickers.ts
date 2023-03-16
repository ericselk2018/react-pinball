import Kicker from '@/engine/entities/Kicker';
import { leftKickerButton, middleKickerButton, rightKickerButton, topKickerButton } from '../buttons/buttons';
import { leftKickerCoil, topKickerCoil, middleKickerCoil, rightKickerCoil } from '../coils/coils';

export const leftKicker: Kicker = {
	coil: leftKickerCoil,
	button: leftKickerButton,
};

export const topKicker: Kicker = {
	coil: topKickerCoil,
	button: topKickerButton,
};

export const middleKicker: Kicker = {
	coil: middleKickerCoil,
	button: middleKickerButton,
};

export const rightKicker: Kicker = {
	coil: rightKickerCoil,
	button: rightKickerButton,
};

export const kickers: Kicker[] = [leftKicker, topKicker, middleKicker, rightKicker];
