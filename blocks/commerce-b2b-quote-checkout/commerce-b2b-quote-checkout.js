/* eslint-disable import/no-unresolved */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
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
import {
  displayOverlaySpinner,
  removeOverlaySpinner,
} from './utils.js';

// Fragment functions
import {
  createCheckoutFragment,
  createAddressSummary,
  createOrderConfirmationFooter,
  createOrderConfirmationFragment,
  selectors,
} from './fragments.js';

// Container functions
import {
  renderBillingAddressFormSkeleton,
  renderBillToShippingAddress,
  renderCheckoutHeader,
  renderCustomerBillingAddresses,
  renderCustomerDetails,
  renderGiftOptions,
  renderLoginForm,
  renderOrderConfirmationFooterButton,
  renderOrderCostSummary,
  renderOrderGiftOptions,
  renderOrderHeader,
  renderOrderProductList,
  renderOrderStatus,
  renderPaymentMethods,
  renderPlaceOrder,
  renderServerError,
  renderShippingAddressFormSkeleton,
  renderShippingMethods,
  renderShippingStatus,
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

import {
  fetchPlaceholders,
  rootLink,
  SUPPORT_PATH,
} from '../../scripts/commerce.js';

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

  // Define the Layout for the Order Confirmation
  async function displayOrderConfirmation(orderData) {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Create order confirmation layout using fragments
    const orderConfirmationFragment = createOrderConfirmationFragment();

    // Create scoped selector for order confirmation fragment (following multi-step pattern)
    const getOrderElement = createScopedSelector(orderConfirmationFragment);

    // Get all order confirmation elements using centralized selectors
    const $orderConfirmationHeader = getOrderElement(selectors.orderConfirmation.header);
    const $orderStatus = getOrderElement(selectors.orderConfirmation.orderStatus);
    const $shippingStatus = getOrderElement(selectors.orderConfirmation.shippingStatus);
    const $customerDetails = getOrderElement(selectors.orderConfirmation.customerDetails);
    const $orderCostSummary = getOrderElement(selectors.orderConfirmation.orderCostSummary);
    const $orderGiftOptions = getOrderElement(selectors.orderConfirmation.giftOptions);
    const $orderProductList = getOrderElement(selectors.orderConfirmation.orderProductList);
    const $orderConfirmationFooter = getOrderElement(selectors.orderConfirmation.footer);

    const labels = await fetchPlaceholders();
    const langDefinitions = {
      default: {
        ...labels,
      },
    };
    await initializers.mountImmediately(orderApi.initialize, { orderData, langDefinitions });

    block.replaceChildren(orderConfirmationFragment);

    await Promise.all([
      renderOrderHeader($orderConfirmationHeader, { orderData }),
      renderOrderStatus($orderStatus),
      renderShippingStatus($shippingStatus),
      renderCustomerDetails($customerDetails),
      renderOrderCostSummary($orderCostSummary),
      renderOrderProductList($orderProductList),
      renderOrderGiftOptions($orderGiftOptions),
    ]);

    // Create footer content using fragments
    $orderConfirmationFooter.innerHTML = createOrderConfirmationFooter(rootLink(SUPPORT_PATH));

    const $continueButton = selectors.orderConfirmation.continueButton;
    const $orderConfirmationFooterBtn = $orderConfirmationFooter.querySelector($continueButton);

    await renderOrderConfirmationFooterButton($orderConfirmationFooterBtn);
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

    await displayOrderConfirmation(orderData);
  }

  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/values', handleCheckoutValues);
  events.on('order/placed', handleOrderPlaced);
}
