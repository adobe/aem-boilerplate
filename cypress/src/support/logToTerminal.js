/**
 * Adds command "cy.logToTerminal(message)" that logs the provided message
 * both to the Cypress UI (cy.log) and to the CI terminal via cy.task("log").
 * This is useful for exposing debug information during CI runs where the
 * Cypress UI output is not visible.
 *
 * Helps maintain visibility of execution flow and errors in headless or
 * pipeline environments.
 */
Cypress.Commands.add("logToTerminal", (message) => {
  cy.log(message);
  cy.task("log", message);
});
