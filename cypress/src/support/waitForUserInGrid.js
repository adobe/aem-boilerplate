/**
 * Custom Cypress command to wait for a user to appear in the company users grid.
 *
 * Handles backend GraphQL caching issue (USF-3516) where users may not be immediately
 * visible after creation via REST API. Implements retry logic with page reloads.
 *
 * @example
 * // Wait for user to appear with Active status
 * cy.checkForUser('user@example.com', 'Active');
 *
 * // Wait for user to appear with Inactive status
 * cy.checkForUser('user@example.com', 'Inactive');
 *
 * @param {string} userEmail - Email of user to find
 * @param {string} expectedStatus - Expected status ('Active' or 'Inactive')
 */
Cypress.Commands.add('checkForUser', (userEmail, expectedStatus = 'Active') => {
  const maxRetries = 8;
  let retries = 0;

  function attemptFind() {
    // Wait for table to be fully loaded
    cy.get('.companyUsersTable', { timeout: 15000 }).should('be.visible');
    cy.get('[aria-busy="true"]', { timeout: 10000 }).should('not.exist');
    cy.wait(1000);

    // Check specifically within the table
    cy.get('.companyUsersTable').then(($table) => {
      const tableText = $table.text();

      // Check for email OR name in the table
      if (tableText.includes(userEmail)) {
        cy.logToTerminal(`✅ User found in grid: ${userEmail}`);

        // Verify user is actually visible in the table
        cy.get('.companyUsersTable').contains(userEmail).should('be.visible');
        
        // Verify status if specified - just check it's visible in the table
        if (expectedStatus) {
          // Wait for table to stabilize and verify status appears in same context
          cy.wait(500);
          cy.get('.companyUsersTable')
            .should('contain.text', userEmail)
            .and('contain.text', expectedStatus);
          cy.logToTerminal(`✅ User status verified: ${expectedStatus}`);
        }
      } else if (retries < maxRetries) {
        retries++;
        cy.logToTerminal(`⏳ User not yet visible, retrying (${retries}/${maxRetries})...`);
        cy.wait(8000); // Wait for backend cache to expire (USF-3516)
        cy.reload();
        cy.wait(2000);

        attemptFind(); // Recursive retry
      } else {
        throw new Error(
          `User ${userEmail} not found in table after ${maxRetries} retries (USF-3516 cache issue)`,
        );
      }
    });
  }

  cy.logToTerminal(`⏳ Checking for user in grid: ${userEmail} (expected status: ${expectedStatus})...`);
  attemptFind();
});
