import { removeDuplicates } from '@/lib/array/array';
import buttons, { leftFlipperButtonButton } from './buttons';

describe('Buttons', () => {
	describe('buttons', () => {
		it('should contain left flipper button button', () => {
			expect(buttons).toContain(leftFlipperButtonButton);
		});
		it('should not contain duplicate ids', () => {
			const withoutDuplicates = removeDuplicates({ array: buttons, isSame: (a, b) => a.id === b.id });
			expect(withoutDuplicates).toEqual(buttons);
		});
	});
});
