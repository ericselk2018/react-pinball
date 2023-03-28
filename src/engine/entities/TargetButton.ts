import Button from './Button';

export default interface TargetButton extends Button {
	readonly image: string;
	readonly videos: ReadonlyArray<string>;
	readonly lightId: number;
}
