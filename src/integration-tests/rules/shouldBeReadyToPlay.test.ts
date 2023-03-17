import { usedTroughButtons } from '@/engine/const/buttons/buttons';
import modes from '@/engine/const/modes/modes';
import Game from '@/engine/entities/Game';
import rules from '@/engine/rules/rules';

describe('rules', () => {
	it('should be ready to play if starting and only pressed buttons are used trough buttons', () => {
		const game: Game = {
			status: 'starting',
			ballsInPlay: 0,
			buttonsPressedThisTurn: [],
			credits: 0,
			currentMode: modes[0],
			currentModeStep: undefined,
			currentModeStepButtonsCompleted: [],
			currentPlayer: {
				ballsTotal: 0,
				ballsUsed: 0,
				initials: '',
				score: 0,
			},
			enableOrDisableFlippers: jest.fn(),
			error: '',
			history: [],
			kickersWithBalls: [],
			log: jest.fn(),
			modeStepButtonsHitThisTurn: [],
			nextPlayer: jest.fn(),
			players: [],
			pressedButton: undefined,
			pressedButtons: usedTroughButtons,
			selected: 0,
			startNextGame: jest.fn(),
			startTurn: jest.fn(),
			tapCoil: jest.fn(),
			turnStartTimeInMilliseconds: 0,
			unpressedButton: undefined,
		};
		rules.forEach((rule) => rule({ game }));

		expect(game.status).toBe('readyToPlay');
	});
});
