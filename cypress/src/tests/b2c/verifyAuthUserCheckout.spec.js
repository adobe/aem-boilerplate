import {
  setGuestShippingAddress,
  setGuestBillingAddress,
  placeOrder,
  signUpUser,
  uncheckBillToShippingAddress,
  setPaymentMethod,
  checkTermsAndConditions,
  editProductOptions
} from "../../actions";
import {
  assertCartSummaryProduct,
  assertCartSummaryProductsOnCheckout,
  assertTitleHasLink,
  assertProductImage,
  assertCartSummaryMisc,
  assertOrderSummaryMisc,
  assertOrderConfirmationCommonDetails,
  assertOrderConfirmationShippingDetails,
  assertOrderConfirmationBillingDetails,
  assertOrderConfirmationShippingMethod,
  assertSelectedPaymentMethod,
  assertAuthUser,
  assertOrderImageDisplay
} from "../../assertions";
import {
  customerShippingAddress,
  customerBillingAddress,
  paymentServicesCreditCard,
  checkMoneyOrder,
  products,
} from "../../fixtures/index";
import * as fields from "../../fields";

describe("Verify auth user can place order", () => {
  it("Verify auth user can place order", { tags: "@snapPercy" }, () => {
    // TODO: replace with single "test" product shared between all tests (not this vs products.configurable.urlPathWithOptions).
    cy.visit(products.configurable.urlPathWithOptions);
    cy.wait(5000);
    cy.get(".minicart-panel").should("be.empty");
    cy.contains("Add to Cart").click();
    cy.get(".minicart-wrapper").click();
    cy.get('.minicart-panel[data-loaded="true"]').should('exist');
    cy.get(".minicart-panel").should("not.be.empty");
    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Configurable product',
      '/products/cypress-configurable-product-latest/cypress456'
    )('.cart-mini-cart');
    assertProductImage(Cypress.env('productImageNameConfigurable'))('.cart-mini-cart');
    editProductOptions("red", "green");
    cy.get(".minicart-wrapper").click();
    cy.get('.minicart-panel[data-loaded="true"]').should('exist');
    cy.get(".minicart-panel").should("not.be.empty");
    cy.contains('CYPRESS456-green').should('be.visible')
    cy.contains('View Cart').click();
    cy.contains('Shopping Cart (2)').should('be.visible')
    cy.contains('CYPRESS456-green').should('be.visible')

    // Edit product in Overlay
    cy.contains('Edit').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('select').eq(1)
      .find('option:selected')
      .should('have.text', 'green');
    cy.get(".dropin-incrementer__decrease-button").eq(1).click();
    cy.get(".dropin-incrementer__input").eq(1).should("have.value", "1");
    cy.get('select').eq(1).select('red');
    cy.get('select').eq(1)
      .find('option:selected')
      .should('have.text', 'red');
    cy.percyTakeSnapshot('Cart Edit Overlay');
    cy.contains('Update in Cart').should('be.visible').click();

    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Configurable product',
      '/products/cypress-configurable-product-latest/cypress456'
    )('.commerce-cart-wrapper');
    cy.visit("/customer/create");
    cy.get(".minicart-wrapper").should("be.visible");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });
    cy.get(".minicart-wrapper").click();
    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Configurable product',
      '/products/cypress-configurable-product-latest/cypress456'
    )('.cart-mini-cart');
    assertProductImage(Cypress.env('productImageNameConfigurable'))('.cart-mini-cart');
    cy.visit("/products/youth-tee/adb150");
    cy.get(".product-details__buttons__add-to-cart button")
      .should("be.visible")
      .click();
    cy.get(".minicart-wrapper").click();
    assertCartSummaryProduct(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    )(".cart-mini-cart");
    assertTitleHasLink(
      "Youth tee",
      "/products/youth-tee/adb150",
    )(".cart-mini-cart");
    assertProductImage(Cypress.env("productImageName"))(".cart-mini-cart");
    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Configurable product',
      '/products/cypress-configurable-product-latest/cypress456'
    )('.cart-mini-cart');
    assertProductImage(Cypress.env('productImageName'))('.cart-mini-cart');
    cy.contains('View Cart').click();
    assertCartSummaryProduct(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    )(".commerce-cart-wrapper");
    assertTitleHasLink(
      "Youth tee",
      "/products/youth-tee/adb150",
    )(".commerce-cart-wrapper");
    assertProductImage(Cypress.env("productImageName"))(
      ".commerce-cart-wrapper",
    );

    assertCartSummaryProduct(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Configurable product',
      '/products/cypress-configurable-product-latest/cypress456'
    )('.commerce-cart-wrapper');
    assertProductImage(Cypress.env('productImageNameConfigurable'))('.commerce-cart-wrapper');
    cy.contains('Estimated Shipping').should('be.visible');
    cy.percyTakeSnapshot('Cart page');
    cy.get('.dropin-button.dropin-button--medium.dropin-button--primary')
      .contains('Checkout')
      .click({ force: true });
    assertCartSummaryMisc(2);
    assertCartSummaryProductsOnCheckout(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    );
    assertCartSummaryProductsOnCheckout(
      'Configurable product',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    );
    setGuestShippingAddress(customerShippingAddress, true);
    uncheckBillToShippingAddress();
    cy.wait(2000);
    setGuestBillingAddress(customerBillingAddress, true);
    assertOrderSummaryMisc("$70.00", "$10.00", "$80.00");
    assertSelectedPaymentMethod(checkMoneyOrder.code, 0);
    setPaymentMethod(paymentServicesCreditCard);
    assertSelectedPaymentMethod(paymentServicesCreditCard.code, 2);
    checkTermsAndConditions();
    cy.wait(5000);
    cy.percyTakeSnapshot('Checkout Page');
    placeOrder();
    assertOrderConfirmationCommonDetails(
      customerBillingAddress,
      paymentServicesCreditCard,
    );
    assertOrderConfirmationShippingDetails(customerShippingAddress);
    assertOrderConfirmationBillingDetails(customerBillingAddress);
    assertOrderConfirmationShippingMethod(customerShippingAddress);
    cy.percyTakeSnapshot('Order Confirmation');

    /**
     * TODO - when /customer/order-details page will be ready
     * Redirect to /order-details?orderRef={ORDER_TOKEN}
     * Confirm that elements similar to orderConfirmation page present (not exactly the same, separate assert needed)
     */
    /**
     * TODO - when /customer/account page will be ready
     * Redirect to /customer/account
     * Confirm that new order is visible in Recent Orders section of account dashboard
     */
    /**
     * TODO - when /customer/orders page will be ready
     * Redirect to /customer/orders
     * Confirm that new order is visible on Orders page
     */

    // Obtain order reference from URL and visit order details page

    cy.url().then((url) => {
      const orderRef = url.split("?")[1];
      cy.visit("/order-details?" + orderRef);
    });
    // CANCEL ORDER
    cy.get(fields.cancelButton).should("exist");
    cy.percyTakeSnapshot('Order Details');
    cy.get(fields.cancelButton).click();

    cy.get(fields.cancellationReasonsSelector).select("1");
    cy.contains('Submit Cancellation').should('be.visible');
    cy.get(fields.cancellationReasonsSelector).should("have.value", "1");
    cy.percyTakeSnapshot('Cancel Order');
    cy.get(fields.submitCancelOrderButton).click();

    cy.get(".dropin-header-container__title", { timeout: 3000 })
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Canceled");

    cy.get(fields.cancellationReasonsModal).should("not.exist");

    cy.get(".order-order-status-content__wrapper-description p")
      .should("exist")
      .and("be.visible")
      .and(
        "contain.text",
        "This order was cancelled by you. You should see a refund to your original payment method with 5-7 business days.",
      );

    cy.get(fields.cancelButton).should("not.exist");

    cy.visit("/customer/orders");
    assertOrderImageDisplay();
    cy.waitForLoadingSkeletonToDisappear();
    cy.percyTakeSnapshot('My Account Order');

    cy.visit("/customer/account");
    assertOrderImageDisplay();
    cy.waitForLoadingSkeletonToDisappear();
    cy.contains('No returns').should('be.visible');
    cy.percyTakeSnapshot('My Account');


  });
});
