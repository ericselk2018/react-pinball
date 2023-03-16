import Coil from '@/engine/entities/Coil';
import { coilId } from '@/lib/id/id';
import { lowerThirdNodeBoard, upperThirdNodeBoard } from '../node-boards/node-boards';

declare type PinNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Coils are groupped by board and sorted by header and pin.
// This is to assist in wiring and finding available pins.
let id = (pin: PinNumber) => coilId({ board: lowerThirdNodeBoard, header: 0, pin });
export const leftFlipperMainCoil: Coil = { name: 'Left Flipper', id: id(0) };
export const leftFlipperHoldCoil: Coil = { name: 'Left Flipper Hold', id: id(1) };
export const rightFlipperMainCoil: Coil = { name: 'Right Flipper', id: id(2) };
export const rightFlipperHoldCoil: Coil = { name: 'Right Flipper Hold', id: id(3) };
export const leftSlingshotCoil: Coil = { name: 'Left Slingshot', id: id(4) };
export const rightSlingshotCoil: Coil = { name: 'Right Slingshot', id: id(5) };
export const troughBallEjectCoil: Coil = { name: 'Trough Ball Eject', id: id(6) };

id = (pin: PinNumber) => coilId({ board: upperThirdNodeBoard, header: 0, pin });
export const rightKickerCoil: Coil = { name: 'Right Kicker', id: id(0) };
export const rightBumperCoil: Coil = { name: 'Right Bumper', id: id(1) };
export const middleKickerCoil: Coil = { name: 'Middle Kicker', id: id(2) };
export const topKickerCoil: Coil = { name: 'Top Kicker', id: id(3) };
export const middleBumperCoil: Coil = { name: 'Middle Bumper', id: id(4) };
export const leftBumperCoil: Coil = { name: 'Left Bumper', id: id(5) };
export const leftKickerCoil: Coil = { name: 'Left Kicker', id: id(6) };

const coils: Coil[] = [leftFlipperMainCoil, leftFlipperHoldCoil, rightFlipperMainCoil, rightFlipperHoldCoil];

export default coils;
