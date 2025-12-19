// eslint-disable-next-line import/no-unresolved
import { createFragment } from '@dropins/storefront-checkout/lib/utils.js';

import { CHECKOUT_BLOCK } from './constants.js';

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
