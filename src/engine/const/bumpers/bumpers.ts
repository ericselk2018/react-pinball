import Bumper from '@/engine/entities/Bumper';
import { leftBumperButton, middleBumperButton, rightBumperButton } from '../buttons/buttons';
import {
	leftBumperCoil,
	leftBumperLamp,
	middleBumperCoil,
	middleBumperLamp,
	rightBumperCoil,
	rightBumperLamp,
} from '../coils/coils';

export const leftBumper: Bumper = {
	coil: leftBumperCoil,
	button: leftBumperButton,
	lamp: leftBumperLamp,
};

export const middleBumper: Bumper = {
	coil: middleBumperCoil,
	button: middleBumperButton,
	lamp: middleBumperLamp,
};

export const rightBumper: Bumper = {
	coil: rightBumperCoil,
	button: rightBumperButton,
	lamp: rightBumperLamp,
};

export const bumpers: Bumper[] = [leftBumper, middleBumper, rightBumper];
