import { products } from "../../../fixtures";
import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/add-to-cart.md
 *
 * Required Contexts: page, storefront, product, shoppingCart, changedProducts
 */

it("is sent on add to cart button click", () => {
  cy.visit(products.configurable.urlPathWithOptions);
  // add to cart
  cy.get(".minicart-panel").should("be.empty");
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .click();
  cy.get(".minicart-panel[data-loaded='true']").should('exist');
  cy.get(".minicart-panel").should("not.be.empty");

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        expectsEventWithContext(
          "add-to-cart",
          [
            "pageContext",
            "storefrontInstanceContext",
            "productContext",
            "shoppingCartContext",
            "changedProductsContext",
          ],
          adobeDataLayer,
        );
      });
  });
});
