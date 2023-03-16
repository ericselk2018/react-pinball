import { bitTest, clamp } from './math';

describe('math', () => {
	describe('bitTest', () => {
		it('should test true if bit 1 is set and test bit is 0 -- zero based', () => {
			expect(bitTest(0b1, 0)).toBe(true);
		});
		it('should test false if bit 2 is set and test bit is 0', () => {
			expect(bitTest(0b10, 0)).toBe(false);
		});
		it('should test true if bit 2 is set and test bit is 1', () => {
			expect(bitTest(0b10, 1)).toBe(true);
		});
		it('should test true if bit 32 is set and test bit is 31', () => {
			expect(bitTest(0b10000000000000000000000000000000, 31)).toBe(true);
		});
		it('should test true if bit 32 is set and test bit is 32', () => {
			expect(bitTest(0b10000000000000000000000000000000, 32)).toBe(false);
		});
	});

	describe('clamp', () => {
		it('should return min value when value is less than min', () => {
			const min = 12;
			expect(clamp({ value: min - 1, min, max: min + 5 })).toBe(min);
		});
		it('should return max value when value is greater than max', () => {
			const max = 12;
			expect(clamp({ value: max + 1, min: max - 5, max })).toBe(max);
		});
		it('should return value when value is in between min and max', () => {
			const value = 12;
			expect(clamp({ value, min: value - 1, max: value + 1 })).toBe(value);
		});
	});
});
