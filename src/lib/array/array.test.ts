import { removeDuplicates } from './array';

describe('array', () => {
	describe('removeDuplicates', () => {
		it('should remove all but one if all are same', () => {
			const result = removeDuplicates({ array: [1, 1, 1], isSame: (a, b) => a === b });
			expect(result.length).toBe(1);
		});
		it('should remove none if all are unique', () => {
			const result = removeDuplicates({ array: [1, 2, 3], isSame: (a, b) => a === b });
			expect(result.length).toBe(3);
		});
	});
});
