import soundEffects from '../const/sound-effects/sound-effects';
import Button from './Button';
import Light from './Light';

export default interface TargetButton extends Button {
	readonly image: string;
	readonly videos: ReadonlyArray<string>;
	readonly light: Light;
	readonly soundEffects?: (keyof typeof soundEffects)[];
}
