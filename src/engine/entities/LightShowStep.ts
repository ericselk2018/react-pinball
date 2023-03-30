import Color from './Color';
import Light from './Light';

export default interface LightShowStep {
	light: Light;
	color: Color;
	timeInMilliseconds: number;
	fadeDurationInMilliseconds: number;
}
