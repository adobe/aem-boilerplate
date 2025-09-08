/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/

import * as fields from "../../fields/index";
import {
  assertGiftOptionsSummary,
  assertCartSummaryProduct,
  assertCartSummaryProductsOnCheckout,
  assertCartSummaryMisc,
} from "../../assertions";
import {
  fillGiftOptiosForm,
  setGuestEmail,
  setGuestShippingAddress,
  placeOrder,
  checkTermsAndConditions,
} from "../../actions";
import { products, customerShippingAddress } from "../../fixtures/index";

describe("Verify price summary on cart", () => {
  it("Verify applied gift code", { tags: "@snapPercy" }, () => {
    cy.visit(products.configurable.urlPathWithOptions);
    cy.get(".minicart-panel").should("be.empty");
    cy.get(".product-details__buttons__add-to-cart button")
      .should("be.visible")
      .click();
    cy.get(".minicart-panel[data-loaded='true']").should('exist');
    cy.get(".minicart-panel").should("not.be.empty");
    cy.get(".minicart-wrapper").click();
    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.cart-mini-cart');
    cy.visit('/cart');
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains("Gift Card")
      .should("be.visible")
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should("be.visible")
      .type(Cypress.env("giftCardA"));

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains("Apply")
      .should("be.visible")
      .click({ multiple: true });
    cy.get(fields.orderSummary).contains("Order Summary").should("be.visible");
    const orderClassName = ".cart-gift-options-view--order";
    cy.get(orderClassName).should("exist").should("be.visible");
    fillGiftOptiosForm(orderClassName);

    cy.wait(3000);

    const itemsClassName =
      ".cart-gift-options-view.cart-gift-options-view--product";
    cy.get(itemsClassName).should("exist").should("be.visible");
    fillGiftOptiosForm(itemsClassName, "product");

    assertGiftOptionsSummary("Printed card", "$100.00");
    assertGiftOptionsSummary("Item gift wrapping", "$100.00");
    assertGiftOptionsSummary("Order gift wrapping", "$30.00");
    cy.get(".dropin-button--primary")
      .contains("Checkout")
      .click({ force: true });
    assertCartSummaryMisc(1);
    assertCartSummaryProductsOnCheckout(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    );
    assertGiftOptionsSummary("Printed card", "$100.00");
    assertGiftOptionsSummary("Item gift wrapping", "$100.00");
    assertGiftOptionsSummary("Order gift wrapping", "$30.00");
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
    setGuestShippingAddress(customerShippingAddress, true);
    cy.contains("No Payment Information Required");
    cy.contains(Cypress.env("giftCardA"));
    checkTermsAndConditions();
    cy.wait(5000);
    cy.percyTakeSnapshot('Checkout page no payment');
    placeOrder();
    // Uncomment following once https://jira.corp.adobe.com/browse/USF-2241 is fixed
    // assertOrderConfirmationShippingDetails(customerShippingAddress);
    // assertGiftOptionsSummary('Printed card', '$100.00');
    // assertGiftOptionsSummary(
    //   'Item gift wrapping',
    //   '$100.00'
    // );
    // assertGiftOptionsSummary(
    //   'Order gift wrapping',
    //   '$30.00'
    // );
    // cy.contains("No Payment Information Required");
  });
});
