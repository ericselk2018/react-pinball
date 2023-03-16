export const removeDuplicates = <T>(args: { array: ReadonlyArray<T>; isSame: (a: T, b: T) => boolean }) => {
	const { array, isSame } = args;
	return array.filter((a, index, array) => array.findIndex((b) => isSame(a, b)) === index);
};

export const replaceItemAtIndex = <T>(args: { array: ReadonlyArray<T>; index: number; item: T }) => {
	const { array } = args;
	return array.map((item, index) => (index === args.index ? args.item : item));
};

export const filterUndefined = <T>(array: ReadonlyArray<T | undefined>) => {
	return array.filter((item) => item !== undefined) as Exclude<T, undefined>[];
};
