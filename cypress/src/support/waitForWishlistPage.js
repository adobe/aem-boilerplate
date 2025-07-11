/**
 * Custom command to wait for wishlist page to be fully loaded
 * This command ensures the page is ready before running assertions
 */
Cypress.Commands.add('waitForWishlistPageLoaded', () => {
  cy.url().should('include', '/wishlist')
  // Wait for the wishlist wrapper to exist
  cy.get('.commerce-wishlist-wrapper').should("exist");

  // Wait for generic loading to disappear
  cy.get('body').should('not.contain', 'Loading...');

  // Wait for actual content to appear (either wishlist items or empty state)
  cy.get('body').should($body => {
    const hasWishlistHeading = $body.find('[data-testid="default-wishlist-heading"]').length > 0;
    const hasEmptyWishlist = $body.find('[data-testid="empty-wishlist"]').length > 0;
    const hasWishlistItems = $body.find('.wishlist-product-item').length > 0;

    // At least one of these should be present when loading is complete
    expect(hasWishlistHeading || hasEmptyWishlist || hasWishlistItems).to.be.true;
  });
}); 