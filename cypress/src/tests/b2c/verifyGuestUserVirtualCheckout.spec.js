import {
  setGuestEmail,
  setPaymentMethod,
  placeOrder,
  checkTermsAndConditions,
  setGuestBillingAddress,
  typeInFieldBasedOnText
} from "../../actions";
import {
  assertCartSummaryProduct,
  assertCartSummaryProductsOnCheckout,
  assertTitleHasLink,
  assertCartSummaryMisc,
  assertOrderSummaryMisc,
  assertOrderConfirmationCommonDetails,
  assertOrderConfirmationBillingDetails,
  assertSelectedPaymentMethod,
} from "../../assertions";
import {
  paymentServicesCreditCard,
  checkMoneyOrder,
  customerBillingAddress,
  products,
} from "../../fixtures/index";
import * as fields from "../../fields";

describe("Verify guest user can place order with virtual product", () => {
  it("Verify guest user can place order with virtual product", { tags: "@snapPercy" }, () => {
    cy.visit(products.virtualGiftCard.urlPath);
    cy.get('select')
      .find('option:selected')
      .should('have.text', 'Choose amount');
    cy.get('select').select('150');
    cy.get('select')
      .find('option:selected')
      .should('have.text', '150');
    typeInFieldBasedOnText('Sender Name', 'John Doe');
    typeInFieldBasedOnText('Sender Email', 'test@example.com');
    typeInFieldBasedOnText('Recipient Name', 'Jane Smith');
    typeInFieldBasedOnText('Recipient Email', 'jane20@example.com');
    cy.get('.dropin-textarea').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit :)');
    cy.contains("Add to Cart").click();
    cy.get(".minicart-wrapper").click();
    cy.get(".minicart-panel[data-loaded='true']").should('exist');
    cy.get(".minicart-panel").should("not.be.empty");
    assertCartSummaryProduct(
      "Gift Card (Virtual)",
      "gift-card-virtual",
      "1",
      "$150.00",
      "$150.00",
      "0",
    )(".cart-mini-cart");

    assertTitleHasLink(
      "Gift Card (Virtual)",
      "/products/gift-card-virtual/gift-card-virtual",
    )(".cart-mini-cart");
    cy.get('.dropin-cart-list__item').within(() => {
      cy.contains('Jane Smith (jane20@example.com)').should('be.visible');
      cy.contains('John Doe (test@example.com)').should('be.visible');
      cy.contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit :)').should('be.visible');
    });
    cy.visit(products.virtual.urlPath);

    cy.get(".dropin-incrementer__input").should("have.value", "1");
    // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
    cy.wait(1000);
    cy.get(".minicart-panel").should("not.be.empty");
    cy.contains("Add to Cart").click();
    cy.get(".minicart-wrapper").click();
    cy.get(".minicart-panel[data-loaded='true']").should('exist');
    cy.get(".minicart-panel").should("not.be.empty");
    cy.wait(2000);
    
    assertCartSummaryProduct(
      "Virtual Product",
      "VIRTUAL123",
      "1",
      "$100.00",
      "$100.00",
      "0",
    )(".cart-mini-cart");

    assertTitleHasLink(
      "Virtual Product",
      "/products/virtual-product/virtual123",
    )(".cart-mini-cart");
    cy.contains("View Cart").click();

    assertCartSummaryProduct(
      "Virtual Product",
      "VIRTUAL123",
      "1",
      "$100.00",
      "$100.00",
      "0",
    )(".commerce-cart-wrapper");

    assertTitleHasLink(
      "Virtual Product",
      "/products/virtual-product/virtual123",
    )(".commerce-cart-wrapper");

    assertCartSummaryProduct(
      "Gift Card (Virtual)",
      "gift-card-virtual",
      "1",
      "$150.00",
      "$150.00",
      "1",
    )(".commerce-cart-wrapper");

    assertTitleHasLink(
      "Gift Card (Virtual)",
      "/products/gift-card-virtual/gift-card-virtual",
    )(".commerce-cart-wrapper");
    cy.get('.cart-cart-summary-list__content').within(() => {
      cy.contains('Jane Smith (jane20@example.com)').should('be.visible');
      cy.contains('John Doe (test@example.com)').should('be.visible');
      cy.contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit :)').should('be.visible');
    });

    cy.get(".dropin-button--primary").contains("Checkout").click();

    assertCartSummaryMisc(2);
    assertCartSummaryProductsOnCheckout(
      "Virtual Product",
      "VIRTUAL123",
      "1",
      "$100.00",
      "$100.00",
      "0",
    );

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
    setGuestEmail(customerBillingAddress.email);
    cy.wait("@setEmailOnCart");

    // Assert that shipping form is not present for Virtual Products
    cy.get(".checkout__shipping-form").should("not.be.visible");

    assertOrderSummaryMisc("$250.00", null, "$250.00");

    assertSelectedPaymentMethod(checkMoneyOrder.code, 0);
    setPaymentMethod(paymentServicesCreditCard);
    assertSelectedPaymentMethod(paymentServicesCreditCard.code, 2);

    setGuestBillingAddress(customerBillingAddress, true);

    checkTermsAndConditions();
    cy.wait(5000);
    cy.percyTakeSnapshot('Checkout with virtual product');
    placeOrder();

    assertOrderConfirmationCommonDetails(
      customerBillingAddress,
      paymentServicesCreditCard,
    );
    assertOrderConfirmationBillingDetails(customerBillingAddress);

    // Obtain order reference from URL and visit order details page
    cy.url().then((url) => {
      const orderRef = url.split("?")[1];
      cy.visit("/order-details?" + orderRef);
    });

    // CANCEL ORDER
    cy.get(fields.cancelButton).should("exist");
    cy.get(fields.cancelButton).click();

    cy.get(fields.cancellationReasonsSelector).select("1");
    cy.get(fields.cancellationReasonsSelector).should("have.value", "1");

    cy.get(fields.submitCancelOrderButton).click();

    cy.get(".dropin-header-container__title", { timeout: 3000 })
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Cancellation requested");

    cy.get(fields.cancellationReasonsModal).should("not.exist");

    cy.get(".order-order-status-content__wrapper-description p")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "The cancellation has been requested")
      .and("contain.text", "Check your email for further instructions.");
  });
});
