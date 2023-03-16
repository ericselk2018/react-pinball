import TargetButton from './TargetButton';

export default interface ModeStep {
	readonly name: string;
	readonly buttons: ReadonlyArray<TargetButton>;
	readonly count: number;
}
