/**
 * Hides (fetch) and (xhr) request entries from the Cypress command log
 * so the log is easier to follow. Requests still run normally and
 * cy.intercept() stubbing/spying still works.
 */
beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});
