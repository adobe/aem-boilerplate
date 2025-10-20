// eslint-disable-next-line import/no-unresolved
import { createFragment } from '@dropins/storefront-checkout/lib/utils.js';

import {
  CHECKOUT_BLOCK,
  ORDER_CONFIRMATION_BLOCK,
} from './constants.js';

/**
 * A frozen, nested object of CSS selectors
 * @readonly
 */
export const selectors = Object.freeze({
  checkout: {
    content: '.checkout__content',
    loader: '.checkout__loader',
    mergedCartBanner: '.checkout__merged-cart-banner',
    heading: '.checkout__heading',
    emptyCart: '.checkout__empty-cart',
    serverError: '.checkout__server-error',
    outOfStock: '.checkout__out-of-stock',
    login: '.checkout__login',
    shippingForm: '.checkout__shipping-form',
    billToShipping: '.checkout__bill-to-shipping',
    delivery: '.checkout__delivery',
    paymentMethods: '.checkout__payment-methods',
    billingForm: '.checkout__billing-form',
    orderSummary: '.checkout__order-summary',
    cartSummary: '.checkout__cart-summary',
    placeOrder: '.checkout__place-order',
    giftOptions: '.checkout__gift-options',
    termsAndConditions: '.checkout__terms-and-conditions',
    main: '.checkout__main',
    aside: '.checkout__aside',
  },
  orderConfirmation: {
    header: '.order-confirmation__header',
    orderStatus: '.order-confirmation__order-status',
    shippingStatus: '.order-confirmation__shipping-status',
    customerDetails: '.order-confirmation__customer-details',
    orderCostSummary: '.order-confirmation__order-cost-summary',
    giftOptions: '.order-confirmation__gift-options',
    orderProductList: '.order-confirmation__order-product-list',
    footer: '.order-confirmation__footer',
    continueButton: '.order-confirmation-footer__continue-button',
    contactSupportLink: '.order-confirmation-footer__contact-support-link',
  },
});

// =============================================================================
// CHECKOUT
// =============================================================================

/**
 * Creates the main checkout fragment with all checkout blocks.
 * @returns {DocumentFragment} The complete checkout fragment.
 */
export function createCheckoutFragment() {
  return createFragment(`
    <div class="checkout__wrapper">
      <div class="checkout__loader"></div>
      <div class="checkout__content">
        <div class="checkout__merged-cart-banner"></div>
        <div class="checkout__main">
          <div class="checkout__heading ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__empty-cart ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__server-error ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__out-of-stock ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__login ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__shipping-form ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__bill-to-shipping ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__delivery ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__payment-methods ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__billing-form ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__terms-and-conditions ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__place-order ${CHECKOUT_BLOCK}"></div>
        </div>
        <div class="checkout__aside">
          <div class="checkout__order-summary ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__gift-options ${CHECKOUT_BLOCK}"></div>
          <div class="checkout__cart-summary ${CHECKOUT_BLOCK}"></div>
        </div>
      </div>
    </div>
  `);
}

// =============================================================================
// ORDER CONFIRMATION
// =============================================================================

/**
 * Creates the order confirmation fragment.
 * @returns {DocumentFragment} The order confirmation fragment.
 */
export function createOrderConfirmationFragment() {
  return createFragment(`
    <div class="order-confirmation">
      <div class="order-confirmation__main">
        <div class="order-confirmation__header ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__order-status ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__shipping-status ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__customer-details ${ORDER_CONFIRMATION_BLOCK}"></div>
      </div>
      <div class="order-confirmation__aside">
        <div class="order-confirmation__order-cost-summary ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__gift-options ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__order-product-list ${ORDER_CONFIRMATION_BLOCK}"></div>
        <div class="order-confirmation__footer ${ORDER_CONFIRMATION_BLOCK}"></div>
      </div>
    </div>
  `);
}

/**
 * Creates the order confirmation footer content with support link.
 * @param {string} supportPath - The support page path for the contact link
 * @returns {string} The footer HTML content
 */
export function createOrderConfirmationFooter(supportPath) {
  return `
    <div class="order-confirmation-footer__continue-button"></div>
    <div class="order-confirmation-footer__contact-support">
      <p>
        Need help?
        <a
          href="${supportPath}"
          rel="noreferrer"
          class="order-confirmation-footer__contact-support-link"
          data-testid="order-confirmation-footer__contact-support-link"
        >
          Contact us
        </a>
      </p>
    </div>
  `;
}
