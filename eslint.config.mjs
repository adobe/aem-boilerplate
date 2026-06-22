import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import globals from 'globals';

export default [
  {
    ignores: ['helix-importer-ui/**', '**/*.min.js', 'scripts/aem.js'],
  },
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
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
      'no-console': ['warn'],
      'no-param-reassign': [2, { props: false }],
    },
  },
];
