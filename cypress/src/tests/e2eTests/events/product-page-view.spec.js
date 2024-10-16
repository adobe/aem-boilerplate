import { expectsEventWithContext } from '../../../assertions';
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
        expectsEventWithContext('product-page-view', ['pageContext', 'storefrontInstanceContext', 'productContext', 'shoppingCartContext'], adobeDataLayer);
      });
    });
});
