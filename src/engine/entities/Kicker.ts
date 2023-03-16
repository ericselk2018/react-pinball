import Button from './Button';
import Coil from './Coil';

export default interface Kicker {
	readonly coil: Coil;
	readonly button: Button;
}
