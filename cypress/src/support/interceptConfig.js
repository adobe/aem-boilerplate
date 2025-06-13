/**
 * Intercepts the config.json file and returns a promise that resolves to the config.json file.
 * @type {import('./index.d.ts').CustomCypressCommands['interceptConfig']}
 */
const interceptConfig = (withConfig) => {
  // See: https://github.com/cypress-io/cypress/issues/14459#issuecomment-768616195
  if (Cypress.browser.family === 'chromium') {
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.enable',
      params: {}
    });

    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    });
  }

  // See: https://docs.cypress.io/api/commands/intercept#cyintercept-and-request-caching
  cy.intercept('/config.json', { middleware: true, method: 'GET' }, (req) => {
    req.on('before:response', (res) => {
      // Force all API responses to not be cached
      res.headers['cache-control'] = 'no-store'
    })

    req.on('response',  (res) => {
      if (withConfig) {
        const newConfig = withConfig(res.body)
        res.send(200, newConfig)
      }
    })
  }).as('interceptConfig')
}

Cypress.Commands.add('interceptConfig', interceptConfig);
