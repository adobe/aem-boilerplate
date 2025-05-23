import {
  checkTermsAndConditions,
  placeOrder,
  setGuestEmail,
  setGuestShippingAddress,
} from "../../../actions";
import { expectsEventWithContext } from "../../../assertions";
import { customerShippingAddress, products } from "../../../fixtures";

/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/place-order.md
 *
 * Required Contexts:
 * - page -> https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/page.ts,
 * - storefront -> https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/storefrontInstance.ts,
 * - shoppingCart -> https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/shoppingCart.ts,
 * - order -> https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/order.ts
 */

it("is sent on place order button click", () => {
  // add item to cart
  cy.visit(products.configurable.urlPathWithOptions);
  // add to cart
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .click();
  // click the minicart toggle
  cy.get('button[data-count="1"]').should("be.visible").click();
  // click the checkout button
  cy.get('#nav div.cart-mini-cart a[href="/checkout"]')
    .should("be.visible")
    .click();

  // fill in the login form
  const apiMethod = "setGuestEmailOnCart";
  const urlTest = Cypress.env("graphqlEndPoint");
  cy.intercept("POST", urlTest, (req) => {
    let data = req.body.query;
    if (data && typeof data == "string") {
      if (data.includes(apiMethod)) {
        req.alias = "setEmailOnCart";
      }
    }
  });
  setGuestEmail(customerShippingAddress.email);
  cy.wait("@setEmailOnCart");
  // fill in the shipping address form
  setGuestShippingAddress(customerShippingAddress, true);
  cy.wait(2000);

  // check terms and conditions
  checkTermsAndConditions();

  // click the place order button
  placeOrder();
  // wait until the URL includes '/order-details'
  cy.url().should("include", "/order-details");

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        expectsEventWithContext(
          "place-order",
          [
            "pageContext",
            "storefrontInstanceContext",
            "shoppingCartContext",
            "orderContext",
          ],
          adobeDataLayer,
        );
      });
  });
});
