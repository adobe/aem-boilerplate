import { products } from "../../../fixtures";
import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/shopping-cart-view.md
 *
 * Required Contexts: page, storefront, shoppingCart
 */

it("is sent on view cart button click", () => {
  cy.visit(products.configurable.urlPathWithOptions);
  // add to cart
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .click();
  // click the minicart toggle
  cy.get('button[data-count="1"]').should("be.visible").click();
  // click the view cart button
  cy.get('#nav div.cart-mini-cart a[href="/cart"]')
    .should("be.visible")
    .click();

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        expectsEventWithContext(
          "shopping-cart-view",
          ["pageContext", "storefrontInstanceContext", "shoppingCartContext"],
          adobeDataLayer
        );
      });
  });
});
