import Button from '@/engine/entities/Button';
import Game from '@/engine/entities/Game';
import ModeStep from '@/engine/entities/ModeStep';
import TargetButton from '@/engine/entities/TargetButton';
import modeStepHit from './mode-step-hit';

describe('mode-step-hit', () => {
	it('should not add pressed button to mode step buttons hit this turn if status is not playing', () => {
		const modeStepButtonsHitThisTurn: Button[] = [];
		const pressedButton: Button = { id: 0, name: '', dificulty: 0 };
		const game = { status: 'not playing', modeStepButtonsHitThisTurn, pressedButton } as unknown as Game;
		modeStepHit({ game });
		expect(game.modeStepButtonsHitThisTurn.length).toBe(0);
	});

	it('should add pressed button to mode step buttons hit this turn if status is playing and button is part of current mode step', () => {
		const pressedButton: TargetButton = { id: 0, name: '', image: '', videos: [], dificulty: 0, light: { id: 0 } };
		const currentModeStep: ModeStep = { buttons: [pressedButton], count: 1, name: '' };
		const modeStepButtonsHitThisTurn: Button[] = [];
		const game = {
			status: 'playing',
			modeStepButtonsHitThisTurn,
			pressedButton,
			currentModeStep,
			log: () => {
				//
			},
		} as unknown as Game;
		modeStepHit({ game });
		expect(game.modeStepButtonsHitThisTurn).toStrictEqual([pressedButton]);
	});

	it('should not add pressed button to mode step buttons hit this turn if pressed button is already in mode step buttons hit this turn', () => {
		const pressedButton: TargetButton = { id: 0, name: '', image: '', videos: [], dificulty: 0, light: { id: 0 } };
		const currentModeStep: ModeStep = { buttons: [pressedButton], count: 1, name: '' };
		const modeStepButtonsHitThisTurn: Button[] = [pressedButton];
		const game = {
			status: 'playing',
			modeStepButtonsHitThisTurn,
			pressedButton,
			currentModeStep,
			log: () => {
				//
			},
		} as unknown as Game;
		modeStepHit({ game });
		expect(game.modeStepButtonsHitThisTurn.length).toBe(1);
	});
});
