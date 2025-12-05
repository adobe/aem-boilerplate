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

      // Custom task to print logs to terminal in CI
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Disable Chrome autofill popups during tests
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Disable password manager and autofill via preferences
          launchOptions.preferences.default = {
            ...launchOptions.preferences.default,
            'credentials_enable_service': false,
            'profile.password_manager_enabled': false,
            'autofill.profile_enabled': false,
            'autofill.credit_card_enabled': false,
            'autofill.address_enabled': false,
          };
          // Add command line args to completely disable autofill
          launchOptions.args.push('--disable-features=AutofillServerCommunication,AutofillEnableAccountWalletStorage');
          launchOptions.args.push('--disable-component-update');
          launchOptions.args.push('--no-first-run');
          launchOptions.args.push('--disable-default-apps');
          launchOptions.args.push('--disable-popup-blocking');
          launchOptions.args.push('--disable-translate');
          launchOptions.args.push('--disable-background-networking');
          launchOptions.args.push('--safebrowsing-disable-auto-update');
          launchOptions.args.push('--disable-sync');
          launchOptions.args.push('--metrics-recording-only');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push('--incognito');
        }
        return launchOptions;
      });

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
