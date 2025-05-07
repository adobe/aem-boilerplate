module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: { browser: true, mocha: true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: [
    'chai-friendly',
  ],
  rules: {
    'no-param-reassign': [2, { props: false }],
    'class-methods-use-this': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'linebreak-style': ['error', 'unix'],
    'no-await-in-loop': 0,
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': ['error', { js: 'always' }],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 6 },
      ObjectPattern: { multiline: true, minProperties: 6 },
      ImportDeclaration: { multiline: true, minProperties: 6 },
      ExportDeclaration: { multiline: true, minProperties: 6 },
    }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
};