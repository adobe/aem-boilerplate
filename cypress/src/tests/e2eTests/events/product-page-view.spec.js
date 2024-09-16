import { products } from '../../../fixtures';
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/product-page-view.md
 *
 * Required Contexts: page, storefront, product, shoppingCart
 */
it('is sent on product page view/render', () => {
  cy.visit(products.configurable.urlPath);
  cy.waitForResource('commerce-events-collector.js')
    .then(() => {
      cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
        const targetEventIndex = adobeDataLayer.findIndex(event => event?.event === 'product-page-view');
        const pageContextIndex = adobeDataLayer.findIndex(event => !!event?.pageContext);
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(event => !!event?.storefrontInstanceContext);
        const productContextIndex = adobeDataLayer.findIndex(event => !!event?.productContext);
        const shoppingCartContextIndex = adobeDataLayer.findIndex(event => !!event?.shoppingCartContext);

        // expected contexts and event are in ACDL
        expect(targetEventIndex).to.be.greaterThan(-1);
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
        expect(productContextIndex).to.be.greaterThan(-1);
        expect(shoppingCartContextIndex).to.be.greaterThan(-1);
      });
    });
});
