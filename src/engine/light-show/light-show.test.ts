import { testAbortSignal, testGame, testLightShow } from '@/lib/test/test';
import { blue, off, red } from '../const/colors/colors';
import { leftBonusLight } from '../const/lights/lights';
import LightShow from '../entities/LightShow';
import LightShowStep from '../entities/LightShowStep';
import lightShow from './light-show';

describe('light-show', () => {
	describe('lightShow', () => {
		it('should call requestAnimationFrame if given a show with at least one step', () => {
			global.requestAnimationFrame = jest.fn();
			const show: LightShow = {
				...testLightShow,
				steps: [{ color: off, fadeDurationInMilliseconds: 0, light: leftBonusLight, timeInMilliseconds: 0 }],
			};
			lightShow({ game: testGame, abortSignal: testAbortSignal, show });
			expect(global.requestAnimationFrame).toBeCalledTimes(1);
		});

		it('should call updateLights with expected values for simple single step', () => {
			const game = testGame;
			const timeInMilliseconds = 1;
			const light = leftBonusLight;
			const color = {
				redPercent: 12,
				bluePercent: 34,
				greenPercent: 56,
			};
			const fadeDurationInMilliseconds = 123;
			const show: LightShow = {
				...testLightShow,
				repeatAfterMilliseconds: 0,
				steps: [
					{
						color,
						fadeDurationInMilliseconds,
						light,
						timeInMilliseconds: timeInMilliseconds - 1,
					},
				],
			};

			global.performance = { now: jest.fn(() => 0) } as unknown as Performance;
			global.requestAnimationFrame = jest.fn().mockImplementationOnce((callback) => {
				callback(timeInMilliseconds);
				return 0;
			});

			lightShow({ game, abortSignal: new AbortController().signal, show });

			expect(game.updateLights).toBeCalledWith({
				updates: [
					{
						redPercent: color.redPercent,
						bluePercent: color.bluePercent,
						greenPercent: color.greenPercent,
						id: light.id,
						fadeDurationInMilliseconds,
					},
				],
			});
		});

		it('should call updateLights with expected values for complex scenario with repeat', () => {
			const game = testGame;
			const step1: LightShowStep = {
				color: red,
				fadeDurationInMilliseconds: 123,
				light: leftBonusLight,
				timeInMilliseconds: 0,
			};
			const step2: LightShowStep = {
				color: blue,
				fadeDurationInMilliseconds: 234,
				light: leftBonusLight,
				timeInMilliseconds: 1,
			};
			const show: LightShow = {
				...testLightShow,
				repeatAfterMilliseconds: 1,
				steps: [step1, step2],
			};

			// With these frame times, and our steps being 0 and 1 ms, and 1 ms repeat delay, we should see:
			//  0 - step1
			//  1 - step2
			//  2 - waiting for repeat, no steps done
			//  3 - step1
			//  4 - step2
			//  5 - waiting for repeat, no steps done
			//  6 - step1
			const frameTimes = [0, 1, 2, 3, 4, 5, 6];

			global.performance = { now: jest.fn(() => 0) } as unknown as Performance;

			let frameCount = 0;
			global.requestAnimationFrame = jest.fn((callback) => {
				const frameTime = frameTimes[frameCount++];
				if (frameTime !== undefined) {
					callback(frameTime);
				}
				return 0;
			});

			lightShow({ game, abortSignal: new AbortController().signal, show });

			const stepToUpdate = (step: LightShowStep) => ({
				redPercent: step.color.redPercent,
				greenPercent: step.color.greenPercent,
				bluePercent: step.color.bluePercent,
				id: step.light.id,
				fadeDurationInMilliseconds: step.fadeDurationInMilliseconds,
			});

			expect((game.updateLights as jest.Mock).mock.calls).toStrictEqual([
				[
					{
						updates: [stepToUpdate(step1)],
					},
				],
				[
					{
						updates: [stepToUpdate(step2)],
					},
				],
				[
					{
						updates: [stepToUpdate(step1)],
					},
				],
				[
					{
						updates: [stepToUpdate(step2)],
					},
				],
				[
					{
						updates: [stepToUpdate(step1)],
					},
				],
			]);
		});
	});
});
