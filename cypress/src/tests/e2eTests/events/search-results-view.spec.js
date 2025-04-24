import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/search-results-view.md
 *
 * Required Contexts: page, storefront, searcResults
 */
it('is sent on search bar view/render', () => {
  cy.visit('/');
  cy.get('.nav-search-button').should('be.visible').click();
  cy.wait(2000);
  cy.get('#search').type('cypress');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
        expectsEventWithContext('search-results-view', ['pageContext', 'storefrontInstanceContext', 'searchResultsContext'], adobeDataLayer);
      });
    });
});

it('is sent on search results page on view/render', () => {
  cy.visit('/search?q=cypress');
  cy.waitForResource('commerce-events-collector.js').then(() => {
    cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
      expectsEventWithContext('search-results-view', ['pageContext', 'storefrontInstanceContext', 'searchResultsContext'], adobeDataLayer);
    });
  });
});
