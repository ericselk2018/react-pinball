import { usedTroughButtons } from '@/engine/const/buttons/buttons';
import Game from '@/engine/entities/Game';
import rules from '@/engine/rules/rules';
import { testGame } from '@/lib/test/test';

describe('rules', () => {
	it('should be ready to play if starting and only pressed buttons are used trough buttons', () => {
		const game: Game = {
			...testGame,
			status: 'starting',
			pressedButtons: usedTroughButtons,
		};
		rules.forEach((rule) => rule({ game }));

		expect(game.status).toBe('readyToPlay');
	});
});
