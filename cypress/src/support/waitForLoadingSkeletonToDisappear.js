Cypress.Commands.add('waitForLoadingSkeletonToDisappear', (selector = '[aria-label="Loading..."]', timeout = 10000) => {
    cy.get(selector, { timeout }).should('not.exist');
});
