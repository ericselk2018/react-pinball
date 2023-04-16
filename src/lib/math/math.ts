export const bitTest = (number: number, bit: number) => (number >> bit) % 2 != 0;

export const clamp = ({ value, min, max }: { value: number; min: number; max: number }) =>
	Math.max(Math.min(value, max), min);

export const getRandomInt = ({ min, max }: { min: number; max: number }) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
