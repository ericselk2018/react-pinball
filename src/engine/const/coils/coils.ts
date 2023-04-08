import Coil from '@/engine/entities/Coil';
import { coilId } from '@/lib/id/id';
import { cabinetNodeBoard, lowerThirdNodeBoard, upperThirdNodeBoard } from '../node-boards/node-boards';

declare type PinNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Coils are groupped by board and sorted by header and pin.
// This is to assist in wiring and finding available pins.
let id = (pin: PinNumber) => coilId({ board: lowerThirdNodeBoard, header: 0, pin });
export const leftFlipperHoldCoil: Coil = { name: 'Left Flipper Hold', id: id(0) };
export const leftFlipperMainCoil: Coil = { name: 'Left Flipper', id: id(1) };
export const leftSlingshotCoil: Coil = { name: 'Left Slingshot', id: id(2) };
export const troughBallEjectCoil: Coil = { name: 'Trough Ball Eject', id: id(3) };
export const rightFlipperHoldCoil: Coil = { name: 'Right Flipper Hold', id: id(4) };
export const rightFlipperMainCoil: Coil = { name: 'Right Flipper', id: id(5) };
export const rightSlingshotCoil: Coil = { name: 'Right Slingshot', id: id(6) };

id = (pin: PinNumber) => coilId({ board: upperThirdNodeBoard, header: 0, pin });
export const rightKickerCoil: Coil = { name: 'Right Kicker', id: id(0) };
export const rightBumperCoil: Coil = { name: 'Right Bumper', id: id(1) };
export const middleBumperCoil: Coil = { name: 'Middle Bumper', id: id(2) };
export const leftKickerCoil: Coil = { name: 'Left Kicker', id: id(3) };
export const topRightKickerCoil: Coil = { name: 'Top Right Kicker', id: id(4) };
export const topKickerCoil: Coil = { name: 'Top Kicker', id: id(5) };
export const leftBumperCoil: Coil = { name: 'Left Bumper', id: id(6) };

id = (pin: PinNumber) => coilId({ board: upperThirdNodeBoard, header: 1, pin });
export const rightBumperLamp: Coil = { name: 'Right Bumper Lamp', id: id(5) };
export const middleBumperLamp: Coil = { name: 'Middle Bumper Lamp', id: id(6) };
export const leftBumperLamp: Coil = { name: 'Left Bumper Lamp', id: id(7) };

id = (pin: PinNumber) => coilId({ board: cabinetNodeBoard, header: 0, pin });
export const selectButtonLamp: Coil = { name: 'Select Button Lamp', id: id(0) };
export const startButtonLamp: Coil = { name: 'Start Button Lamp', id: id(1) };

const coils: Coil[] = [leftFlipperMainCoil, leftFlipperHoldCoil, rightFlipperMainCoil, rightFlipperHoldCoil];

export default coils;
