import {
  setGuestShippingAddress,
  setGuestBillingAddress,
  placeOrder,
  signUpUser,
  uncheckBillToShippingAddress,
  setPaymentMethod,
} from '../../actions';
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
} from '../../assertions';
import {
  customerShippingAddress,
  customerBillingAddress,
  paymentServicesCreditCard,
  checkMoneyOrder,
  products
} from '../../fixtures/index';
import * as fields from "../../fields";

describe('Verify auth user can place order', () => {
  it('Verify auth user can place order', () => {
    // TODO: replace with single "test" product shared between all tests (not this vs products.configurable.urlPathWithOptions).
    cy.visit(products.configurable.urlPathWithOptions);
    cy.wait(5000);
    cy.contains('Add to Cart').click();
    cy.get('.minicart-wrapper').click();
    assertCartSummaryProduct(
      'Cypress Configurable product latest',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Cypress Configurable product latest',
      '/products/cypress-configurable-product-latest/CYPRESS456'
    )('.cart-mini-cart');
    assertProductImage('/thumbnail.jpg')('.cart-mini-cart');
    cy.contains('View Cart').click();
    assertCartSummaryProduct(
      'Cypress Configurable product latest',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Cypress Configurable product latest',
      '/products/cypress-configurable-product-latest/CYPRESS456'
    )('.commerce-cart-wrapper');
    cy.visit("/customer/create");
    cy.get('.minicart-wrapper').should('be.visible')
    cy.fixture('userInfo').then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });
    cy.get('.minicart-wrapper').click();
    assertCartSummaryProduct(
      'Cypress Configurable product latest',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Cypress Configurable product latest',
      '/products/cypress-configurable-product-latest/CYPRESS456'
    )('.cart-mini-cart');
    assertProductImage('/thumbnail.jpg')('.cart-mini-cart');
    cy.visit("/products/youth-tee/ADB150");
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.get('.minicart-wrapper').click();
    assertCartSummaryProduct(
      'Youth tee',
      'ADB150',
      '1',
      '$10.00',
      '$10.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Youth tee',
      '/products/youth-tee/ADB150'
    )('.cart-mini-cart');
    assertProductImage('/ADB150.jpg')('.cart-mini-cart');
    assertCartSummaryProduct(
      'Cypress Configurable product latest',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Cypress Configurable product latest',
      '/products/cypress-configurable-product-latest/CYPRESS456'
    )('.cart-mini-cart');
    assertProductImage('/thumbnail.jpg')('.cart-mini-cart');
    cy.contains('View Cart').click();
    assertCartSummaryProduct(
      'Youth tee',
      'ADB150',
      '1',
      '$10.00',
      '$10.00',
      '0'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Youth tee',
      '/products/youth-tee/ADB150'
    )('.commerce-cart-wrapper');
    assertProductImage('/ADB150.jpg')('.commerce-cart-wrapper');

    assertCartSummaryProduct(
      'Cypress Configurable product latest',
      'CYPRESS456',
      '1',
      '$60.00',
      '$60.00',
      '1'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Cypress Configurable product latest',
      '/products/cypress-configurable-product-latest/CYPRESS456'
    )('.commerce-cart-wrapper');
    assertProductImage('/thumbnail.jpg')('.commerce-cart-wrapper');
    cy.contains('Estimated Shipping').should('be.visible');
    cy.get('.dropin-button.dropin-button--medium.dropin-button--primary')
      .contains('Checkout')
      .click({ force: true });
    assertCartSummaryMisc(2);
    assertCartSummaryProductsOnCheckout(
      'Youth tee',
      'ADB150',
      '1',
      '$10.00',
      '$10.00',
      '0'
    );
    assertCartSummaryProductsOnCheckout(
      'Cypress Configurable product latest',
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
    assertOrderSummaryMisc('$70.00', '$10.00', '$80.00');
    assertSelectedPaymentMethod(checkMoneyOrder.code, 0);
    setPaymentMethod(paymentServicesCreditCard);
    assertSelectedPaymentMethod(paymentServicesCreditCard.code, 2);
    cy.wait(5000);
    placeOrder();
    assertOrderConfirmationCommonDetails(customerBillingAddress, paymentServicesCreditCard);
    assertOrderConfirmationShippingDetails(customerShippingAddress);
    assertOrderConfirmationBillingDetails(customerBillingAddress);
    assertOrderConfirmationShippingMethod(customerShippingAddress);
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
      const orderRef = url.split('?')[1];
      cy.visit('/order-details?' + orderRef)
    })

    // CANCEL ORDER
    cy.get(fields.cancelButton).should('exist');
    cy.get(fields.cancelButton).click();

    cy.get(fields.cancellationReasonsSelector).select('1');
    cy.get(fields.cancellationReasonsSelector).should('have.value', '1');

    cy.get(fields.submitCancelOrderButton).click();

    cy.get('.dropin-header-container__title', { timeout: 3000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Canceled');

    cy.get(fields.cancellationReasonsModal).should('not.exist');

    cy.get('.order-order-status-content__wrapper-description p')
      .should('exist')
      .and('be.visible')
      .and(
        'contain.text',
        'This order was cancelled by you. You should see a refund to your original payment method with 5-7 business days.'
      );

    cy.get(fields.cancelButton).should('not.exist');
  });
});
