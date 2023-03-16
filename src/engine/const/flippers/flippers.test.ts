import {
	leftFlipperButtonButton,
	leftFlipperEndOfStrokeButton,
	rightFlipperButtonButton,
	rightFlipperEndOfStrokeButton,
} from '../buttons/buttons';
import flippers, { leftFlipper, rightFlipper } from './flippers';

describe('Flippers', () => {
	describe('flippers', () => {
		it('should contain left flipper', () => {
			expect(flippers).toContain(leftFlipper);
		});
		it('should contain right flipper', () => {
			expect(flippers).toContain(rightFlipper);
		});
	});

	describe('leftFlipper', () => {
		it('should have correct end of stroke button', () => {
			expect(leftFlipper.endOfStrokeButton).toBe(leftFlipperEndOfStrokeButton);
		});
		it('should have correct button button', () => {
			expect(leftFlipper.buttonButton).toBe(leftFlipperButtonButton);
		});
	});

	describe('rightFlipper', () => {
		it('should have correct end of stroke button', () => {
			expect(rightFlipper.endOfStrokeButton).toBe(rightFlipperEndOfStrokeButton);
		});
		it('should have correct button button', () => {
			expect(rightFlipper.buttonButton).toBe(rightFlipperButtonButton);
		});
	});
});
