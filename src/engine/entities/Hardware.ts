export interface HardwareResponse {
	buttons: { id: number; closed: boolean }[];
	configureAutoTriggeredDiverter: (args: {
		coilId: number;
		enterButtonId: number;
		exitButtonId: number;
		trigger: { enterButtonCondition: boolean; exitButtonCondition: boolean };
		fullPowerTimeInMilliseconds: number;
		partialPowerTimeInDeciseconds: number;
		partialPowerPercent: number;
		restTimeInMilliseconds: number;
	}) => Promise<void>;
	latch: (args: {
		coilId: number;
		buttonCondition: boolean;
		buttonId: number;
		kickTimeInMilliseconds: number;
		kickPowerPercent: number;
		latchPowerPercent: number;
		restTimeInMilliseconds: number;
	}) => Promise<void>;
	modifyTrigger: (args: {
		coilId: number;
		control: 'auto' | 'tap' | 'off' | 'on';
		buttonId?: number;
	}) => Promise<void>;
	configurePulse: (args: {
		coilId: number;
		buttonId?: number;
		buttonCondition?: boolean;
		pulsePowerPercent: number;
		pulseTimeInMilliseconds: number;
		restTimeInMilliseconds: number;
	}) => Promise<void>;
}

export interface HardwareRequest {
	onButtonChange: (args: { buttonId: number; closed: boolean }) => void;
	maxButtonId: number;
}

type Hardware = (args: HardwareRequest) => Promise<HardwareResponse>;

export default Hardware;
