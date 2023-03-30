import LightShowStep from './LightShowStep';

export default interface LightShow {
	steps: LightShowStep[];
	repeatAfterMilliseconds: number;
}
