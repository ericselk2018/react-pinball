import Button from './Button';
import Coil from './Coil';

export default interface Bumper {
	readonly coil: Coil;
	readonly button: Button;
	readonly lamp: Coil;
}
