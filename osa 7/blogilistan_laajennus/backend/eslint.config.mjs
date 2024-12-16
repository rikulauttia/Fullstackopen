import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: {
				...globals.node,
				...globals.browser,
				...globals.jest,
				...globals.es2021,
			},
			ecmaVersion: 'latest',
		},
		plugins: {
			'@stylistic/js': stylisticJs,
			prettier: prettierPlugin,
		},
		rules: {
			'@stylistic/js/indent': ['error', 'tab'],
			'@stylistic/js/linebreak-style': ['error', 'unix'],
			'@stylistic/js/quotes': ['error', 'single'],
			'@stylistic/js/semi': ['error', 'never'],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-console': 'off',
			'prettier/prettier': ['error'],
		},
	},
];
