import Button from './Button';
import Coil from './Coil';

export default interface Flipper {
	readonly buttonButton: Button;
	readonly endOfStrokeButton: Button;
	readonly mainCoil: Coil;
	readonly holdCoil: Coil;
}
