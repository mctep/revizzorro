import js from '@eslint/js';
import globals from 'globals';
import eslint from 'typescript-eslint';

export default eslint.config(
	// { ignores: ['dist', 'coverage', 'dist-api', 'lib'] },
	{
		extends: [
			js.configs.recommended,
			...eslint.configs.strictTypeChecked,
			...eslint.configs.stylisticTypeChecked,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				projectService: {
					defaultProject: 'tsconfig.json',
					allowDefaultProject: ['*.mjs'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'no-console': 'error',
			'@typescript-eslint/restrict-plus-operands': 'error',
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowAny: false,
					allowBoolean: false,
					allowNever: false,
					allowNullish: false,
					allowNumber: true,
					allowRegExp: false,
				},
			],
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-spread': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': [
				'error',
				{
					ignorePrimitives: {
						number: true,
						boolean: true,
						string: true,
					},
				},
			],
		},
	},
);
