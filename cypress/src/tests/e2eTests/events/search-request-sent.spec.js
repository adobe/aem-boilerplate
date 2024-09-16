/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/search-request-sent.md
 *
 * Required Contexts: page, storefront, searchInput
 */
it('is sent on search bar view/render', () => {
  cy.visit('/');
  cy.get('.nav-search-button').should('be.visible').click();
  cy.wait(2000);
  cy.get('#search').type('test');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
        const targetEventIndex = adobeDataLayer.findIndex(event => event?.event === 'search-request-sent');
        const pageContextIndex = adobeDataLayer.findIndex(event => !!event?.pageContext);
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(event => !!event?.storefrontInstanceContext);
        const searchInputContextIndex = adobeDataLayer.findIndex(event => !!event?.searchInputContext);

        // expected contexts and event are in ACDL
        expect(targetEventIndex).to.be.greaterThan(-1);
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
        expect(searchInputContextIndex).to.be.greaterThan(-1);
      });
    });
});

it('is sent on search results page on view/render', () => {
  cy.visit('/search?q=test');
  cy.waitForResource('commerce-events-collector.js').then(() => {
    cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
      const targetEventIndex = adobeDataLayer.findIndex(event => event?.event === 'search-request-sent');
      const pageContextIndex = adobeDataLayer.findIndex(event => !!event?.pageContext);
      const storefrontInstanceContextIndex = adobeDataLayer.findIndex(event => !!event?.storefrontInstanceContext);
      const searchInputContextIndex = adobeDataLayer.findIndex(event => !!event?.searchInputContext);

      // expected contexts and event are in ACDL
      expect(targetEventIndex).to.be.greaterThan(-1);
      expect(pageContextIndex).to.be.greaterThan(-1);
      expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
      expect(searchInputContextIndex).to.be.greaterThan(-1);
    });
  });
});
