const config = {
  verbose: true,
  // testMatch: [ "**/?(*.)+(spec|test).mjs" ]
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  coveragePathIgnorePatterns: [
    '/scripts/aem.js',
    '/tests/test-helper.js',
    '.*\\.templates\\.js'
  ]
};

export default config;
