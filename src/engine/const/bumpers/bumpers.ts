import Bumper from '@/engine/entities/Bumper';
import { leftBumperButton, middleBumperButton, rightBumperButton } from '../buttons/buttons';
import { leftBumperCoil, middleBumperCoil, rightBumperCoil } from '../coils/coils';

export const leftBumper: Bumper = {
	coil: leftBumperCoil,
	button: leftBumperButton,
};

export const middleBumper: Bumper = {
	coil: middleBumperCoil,
	button: middleBumperButton,
};

export const rightBumper: Bumper = {
	coil: rightBumperCoil,
	button: rightBumperButton,
};

export const bumpers: Bumper[] = [leftBumper, middleBumper, rightBumper];
