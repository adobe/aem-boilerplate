/**
 * Custom command to wait for wishlist page to be fully loaded
 * This command ensures the page is ready before running assertions
 */
Cypress.Commands.add('waitForWishlistPageLoaded', () => {
  // Wait for loading to disappear and page to be fully loaded
  cy.get('body').should('not.contain', 'Loading...');
  
  // Ensure we're on the wishlist page
  cy.url().should('include', '/wishlist');
  
  // Wait for the main wishlist content area to be present
  cy.get('.commerce-wishlist-wrapper').should('be.visible');
}); 