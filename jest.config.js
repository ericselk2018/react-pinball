/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
	return {
		preset: 'ts-jest',
		moduleNameMapper: {
			'^@/(.*)$': '<rootDir>/src/$1',
		},
		transform: {
			'^.+\\.tsx?$': 'ts-jest',
		},
	};
};
