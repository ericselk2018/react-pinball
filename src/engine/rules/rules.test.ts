import rules from './rules';

describe('rules', () => {
	it('should not have duplicates', () => {
		const hasDuplicates = rules.some((rule, index) => rules.indexOf(rule) !== index);
		expect(hasDuplicates).toBe(false);
	});
});
