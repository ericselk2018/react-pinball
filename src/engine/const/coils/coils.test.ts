import { removeDuplicates } from '@/lib/array/array';
import coils, { leftFlipperMainCoil } from './coils';

describe('Coils', () => {
	describe('coils', () => {
		it('should contain left flipper main coil', () => {
			expect(coils).toContain(leftFlipperMainCoil);
		});
		it('should not contain duplicate ids', () => {
			const withoutDuplicates = removeDuplicates({ array: coils, isSame: (a, b) => a.id === b.id });
			expect(withoutDuplicates).toEqual(coils);
		});
	});
});
