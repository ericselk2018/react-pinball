import ModeStep from './ModeStep';

export default interface Mode {
	readonly name: string;
	readonly steps: ReadonlyArray<ModeStep>;
	readonly video: string;
}
