import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  {
    ignores: ['helix-importer-ui/**', '**/*.min.js', 'scripts/aem.js'],
  },
  ...compat.extends('airbnb-base'),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'import/extensions': ['error', { js: 'always' }],
      'linebreak-style': ['error', 'unix'],
      'no-param-reassign': [2, { props: false }],
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
