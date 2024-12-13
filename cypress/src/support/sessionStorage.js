Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});

// Set session storage before each tests
beforeEach(() => {
  cy.setSessionStorage('environment', 'stage');
});
