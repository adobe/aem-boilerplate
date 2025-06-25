import {
  setGuestEmail,
  setPaymentMethod,
  placeOrder,
  checkTermsAndConditions,
  setGuestBillingAddress,
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
  it("Verify guest user can place order with virtual product", () => {
    cy.visit(products.virtual.urlPath);

    cy.get(".dropin-incrementer__input").should("have.value", "1");
    // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
    cy.wait(1000);
    cy.get(".minicart-panel").should("be.empty");
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
      "/products/virtual-product/VIRTUAL123",
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
      "/products/virtual-product/VIRTUAL123",
    )(".commerce-cart-wrapper");

    cy.get(".dropin-button--primary").contains("Checkout").click();

    assertCartSummaryMisc(1);
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

    assertOrderSummaryMisc("$100.00", null, "$100.00");

    assertSelectedPaymentMethod(checkMoneyOrder.code, 0);
    setPaymentMethod(paymentServicesCreditCard);
    assertSelectedPaymentMethod(paymentServicesCreditCard.code, 2);

    setGuestBillingAddress(customerBillingAddress, true);

    checkTermsAndConditions();
    cy.wait(5000);
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
