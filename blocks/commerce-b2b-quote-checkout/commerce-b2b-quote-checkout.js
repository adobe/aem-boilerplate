/* eslint-disable import/no-unresolved */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';

// Checkout Dropin Libraries
import {
  createScopedSelector,
  isVirtualCart,
  setMetaTags,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Block Utilities
import { displayOverlaySpinner, removeOverlaySpinner } from './utils.js';

// Fragment functions
import {
  createCheckoutFragment,
  createAddressSummary,
  selectors,
} from './fragments.js';

// Container functions
import {
  renderBillingAddressFormSkeleton,
  renderBillToShippingAddress,
  renderCheckoutHeader,
  renderCustomerBillingAddresses,
  renderGiftOptions,
  renderLoginForm,
  renderPaymentMethods,
  renderPlaceOrder,
  renderServerError,
  renderShippingAddressFormSkeleton,
  renderShippingMethods,
  renderTermsAndConditions,
} from './containers.js';

// Constants
import {
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  LOGIN_FORM_NAME,
  PURCHASE_ORDER_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,
} from './constants.js';

import { rootLink } from '../../scripts/commerce.js';

// Success block entry point
import { renderOrderSuccess } from '../commerce-checkout-success/commerce-checkout-success.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';
import '../../scripts/initializers/quote-management.js';

export default async function decorate(block) {
  // Container and component references
  let billingForm;
  let shippingAddresses;
  let billingAddresses;

  const billingFormRef = { current: null };
  const creditCardFormRef = { current: null };
  const loaderRef = { current: null };

  setMetaTags('B2B Checkout');
  document.title = 'B2B Checkout';

  events.on('order/placed', () => {
    setMetaTags('B2B Order Confirmation');
    document.title = 'B2B Order Confirmation';
  });

  // Create the checkout layout using fragments
  const checkoutFragment = createCheckoutFragment();

  // Create scoped selector for the checkout fragment
  const getElement = createScopedSelector(checkoutFragment);

  // Get all checkout elements using centralized selectors
  const $content = getElement(selectors.checkout.content);
  const $loader = getElement(selectors.checkout.loader);
  const $heading = getElement(selectors.checkout.heading);
  const $serverError = getElement(selectors.checkout.serverError);
  const $login = getElement(selectors.checkout.login);
  const $shippingForm = getElement(selectors.checkout.shippingForm);
  const $billToShipping = getElement(selectors.checkout.billToShipping);
  const $delivery = getElement(selectors.checkout.delivery);
  const $paymentMethods = getElement(selectors.checkout.paymentMethods);
  const $billingForm = getElement(selectors.checkout.billingForm);
  const $placeOrder = getElement(selectors.checkout.placeOrder);
  const $giftOptions = getElement(selectors.checkout.giftOptions);
  const $termsAndConditions = getElement(selectors.checkout.termsAndConditions);

  block.appendChild(checkoutFragment);

  // Create validation and place order handlers
  const handleValidation = () => validateForms([
    { name: LOGIN_FORM_NAME },
    { name: PURCHASE_ORDER_FORM_NAME },
    { name: BILLING_FORM_NAME, ref: billingFormRef },
    { name: TERMS_AND_CONDITIONS_FORM_NAME },
  ]);

  const handlePlaceOrder = async ({ quoteId, code }) => {
    await displayOverlaySpinner(loaderRef, $loader);
    try {
      // Payment Services credit card
      if (code === PaymentMethodCode.CREDIT_CARD) {
        if (!creditCardFormRef.current) {
          console.error('Credit card form not rendered.');
          return;
        }
        if (!creditCardFormRef.current.validate()) {
          // Credit card form invalid; abort order placement
          return;
        }
        // Submit Payment Services credit card form
        await creditCardFormRef.current.submit();
      }
      // Place order
      await orderApi.placeNegotiableQuoteOrder(quoteId);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      removeOverlaySpinner(loaderRef, $loader);
    }
  };

  // First, render the place order component
  const placeOrder = await renderPlaceOrder($placeOrder, {
    handleValidation,
    handlePlaceOrder,
  });

  // Render the remaining containers
  const [
    _header,
    _serverError,
    _loginForm,
    _shippingFormSkeleton,
    _billToShipping,
    _shippingMethods,
    _paymentMethods,
    _billingFormSkeleton,
    _termsAndConditions,
    _giftOptions,
  ] = await Promise.all([
    renderCheckoutHeader($heading, 'B2B Checkout'),

    renderServerError($serverError, $content),

    renderLoginForm($login),

    renderShippingAddressFormSkeleton($shippingForm),

    renderBillToShippingAddress($billToShipping, placeOrder),

    renderShippingMethods($delivery),

    renderPaymentMethods($paymentMethods, creditCardFormRef),

    renderBillingAddressFormSkeleton($billingForm),

    renderTermsAndConditions($termsAndConditions),

    renderGiftOptions($giftOptions),
  ]);

  async function initializeCheckout(data) {
    await initReCaptcha(0);

    if (data?.uid && data.shippingAddresses?.[0]) {
      const quoteAddress = data.shippingAddresses[0];
      const quoteAddressSummary = createAddressSummary(
        quoteAddress,
        null,
        'Shipping address',
      );
      $shippingForm.innerHTML = '';
      $shippingForm.appendChild(quoteAddressSummary);
    }

    removeOverlaySpinner(loaderRef, $loader);
    await displayCustomerAddressForms(data);
  }

  async function displayCustomerAddressForms(data) {
    if (isVirtualCart(data)) {
      shippingAddresses?.remove();
      shippingAddresses = null;
      $shippingForm.innerHTML = '';
    }

    if (!billingAddresses) {
      billingForm?.remove();
      billingForm = null;
      billingFormRef.current = null;

      billingAddresses = await renderCustomerBillingAddresses(
        $billingForm,
        billingFormRef,
        data,
        placeOrder,
      );
    }
  }

  async function handleCheckoutInitialized(data) {
    await initializeCheckout(data);
  }

  async function handleCheckoutUpdated(data) {
    await initializeCheckout(data);
  }

  function handleCheckoutValues(payload) {
    const { isBillToShipping } = payload;
    $billingForm.style.display = isBillToShipping ? 'none' : 'block';
  }

  async function handleOrderPlaced(orderData) {
    // Clear address form data
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const orderNumber = orderData.number;
    const encodedOrderRef = encodeURIComponent(orderRef);
    const encodedOrderNumber = encodeURIComponent(orderNumber);

    const url = token
      ? rootLink(`/order-details?orderRef=${encodedOrderRef}`)
      : rootLink(
        `/order-details?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`,
      );

    window.history.pushState({}, '', url);

    await renderOrderSuccess(block, { orderData });
  }

  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/values', handleCheckoutValues);
  events.on('order/placed', handleOrderPlaced);
}
