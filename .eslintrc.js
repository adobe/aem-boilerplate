/*
  Recommendation: Always try to refactor your code to simply avoid using unsafe browser APIs.
    Use:
      * Element.textContent
      * Element.appendChild
      * Document.createElement
      * etc.
    instead of:
      * Element.innerHTML
      * Element.outerHTML
      * Element.insertAdjacentHTML
      * Range.createContextualFragment
      * etc.
  https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html#guideline-3-use-documentcreateelement-elementsetattributevalue-elementappendchild-and-similar-to-build-dynamic-interfaces
*/
const ENCODE_SANITIZE_METHODS = [
  'escapeHtml',
  'DOMPurify.sanitize',
];

module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  globals: {
    DOMPurify: 'readonly',
  },
  plugins: ['no-unsanitized'],
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    // Flag usage of unsafe DOM APIs to mitigate XSS
    'no-unsanitized/method': [
      'error',
      { escape: { defaultDisable: true, methods: [...ENCODE_SANITIZE_METHODS] } },
    ],
    'no-unsanitized/property': [
      'error',
      { escape: { defaultDisable: true, methods: [...ENCODE_SANITIZE_METHODS] } },
    ],
  },
};
