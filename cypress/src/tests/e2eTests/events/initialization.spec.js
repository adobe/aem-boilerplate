const baselineContexts = (adobeDataLayer) => {
  const pageContextIndex = adobeDataLayer.findIndex(event => !!event?.pageContext);
  const storefrontInstanceContextIndex = adobeDataLayer.findIndex(event => !!event?.storefrontInstanceContext);
  const eventForwardingContextIndex = adobeDataLayer.findIndex(event => !!event?.eventForwardingContext);

  expect(pageContextIndex).to.be.greaterThan(-1);
  expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
  expect(eventForwardingContextIndex).to.be.greaterThan(-1);
};

it('has baseline contexts on homepage', () => {
  cy.visit('/');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on PDP', () => {
  cy.visit('/products/frankie-sweatshirt/MH04');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on cart', () => {
  cy.visit('/cart');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});

it('has baseline contexts on checkout', () => {
  cy.visit('/checkout');
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then(baselineContexts);
    });
});
