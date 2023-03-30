/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
	return {
		preset: 'ts-jest',
		modulePathIgnorePatterns: ['src/lib/test/test.ts'],
		moduleNameMapper: {
			'^@/(.*)$': '<rootDir>/src/$1',
		},
		transform: {
			'^.+\\.tsx?$': 'ts-jest',
		},
		restoreMocks: true,
		resetMocks: true,
	};
};
