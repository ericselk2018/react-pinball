import { changeLetterAt } from './string';

describe('string', () => {
	describe('changeLetterAt', () => {
		it('should correctly change 2nd letter from A to Z when down is true', () => {
			expect(changeLetterAt({ text: 'AAA', index: 1, down: true })).toBe('AZA');
		});

		it('should correctly change 3rd letter from Z to A when down is false', () => {
			expect(changeLetterAt({ text: 'BBZ', index: 2, down: false })).toBe('BBA');
		});

		it('should correctly change 1st letter from A to B when down is false', () => {
			expect(changeLetterAt({ text: 'AFG', index: 0, down: false })).toBe('BFG');
		});
	});
});
