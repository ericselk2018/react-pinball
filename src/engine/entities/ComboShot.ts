import Button from './Button';

export default interface ComboShot {
	name: string;
	mustHitInOrder?: true;
	dificulty: number;
	buttons: Button[];
	videos: string[];
}
