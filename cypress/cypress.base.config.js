module.exports = {
  defaultCommandTimeout: 60000,
  screenshotsFolder: 'screenshots',
  downloadsFolder: 'downloads',
  fixturesFolder: 'src/fixtures',
  video: false,
  pageLoadTimeout: 60000,
  requestTimeout: 60000,
  viewportHeight: 900,
  viewportWidth: 1440,
  scrollBehavior: 'nearest',
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'http://localhost:3000/',
    supportFile: 'src/support/index.js',
    specPattern: 'src/tests/b2c/**/*.spec.js',
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
};
