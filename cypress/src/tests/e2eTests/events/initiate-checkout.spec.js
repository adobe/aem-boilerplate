import { products } from '../../../fixtures';
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/initiate-checkout.md
 *
 * Required Contexts: page, storefront, shoppingCart
 */
it("is sent on mini cart Checkout button click", () => {
  cy.visit(
    products.configurable.urlPathWithOptions
  );
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        const pageContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.pageContext
        );
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.storefrontInstanceContext
        );
        // page and storefront pushed before spy
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
      });
  });
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      // add to cart
      cy.get("span:contains('Add to Cart')").should("be.visible").click();
      // click the minicart toggle
      cy.get('button[data-count="1"]').should("be.visible").click();
      // click the checkout button
      cy.get('#nav div.cart-mini-cart a[href="/checkout"]')
        .should("be.visible")
        .click()
        .then(() => {
          cy.get("@adl", { timeout: 1000 }).should((adobeDataLayerPush) => {
            const targetEventIndex = adobeDataLayerPush.args.findIndex(
              (event) => event[0]?.event === "initiate-checkout"
            );
            const shoppingCartContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.shoppingCartContext
            );
            expect(targetEventIndex).to.be.greaterThan(-1);
            expect(shoppingCartContextIndex).to.be.greaterThan(-1);
          });
        });
    });
  });
});

it("is sent on cart page Checkout button click", () => {
  // add item to cart
  cy.visit(
    products.configurable.urlPathWithOptions
  );
  // add to cart
  cy.get("span:contains('Add to Cart')").should("be.visible").click();
  // after mini cart count updates, go to /cart page
  cy.get('button[data-count="1"]').should("be.visible");
  cy.visit("/cart");

  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        const pageContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.pageContext
        );
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.storefrontInstanceContext
        );
        // page and storefront pushed before spy
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
      });
  });
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      // click the checkout button
      cy.get(
        "body > main:nth-child(2) > div.section.commerce-cart-order-summary-container > div > div > div > div.cart-order-summary__content > div.cart-order-summary__entry.cart-order-summary__primaryAction > a"
      )
        .should("be.visible")
        .click()
        .then(() => {
          cy.get("@adl", { timeout: 1000 }).should((adobeDataLayerPush) => {
            const targetEventIndex = adobeDataLayerPush.args.findIndex(
              (event) => event[0]?.event === "initiate-checkout"
            );
            const shoppingCartContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.shoppingCartContext
            );
            expect(targetEventIndex).to.be.greaterThan(-1);
            expect(shoppingCartContextIndex).to.be.greaterThan(-1);
          });
        });
    });
  });
});
