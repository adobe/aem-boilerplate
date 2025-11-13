/* eslint-disable import/no-unresolved */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initReCaptcha } from '@dropins/tools/recaptcha.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';

// Checkout Dropin Libraries
import {
  createScopedSelector,
  isEmptyCart,
  isVirtualCart,
  setMetaTags,
  validateForms,
} from '@dropins/storefront-checkout/lib/utils.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';

// Block Utilities
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import { displayOverlaySpinner, removeModal, removeOverlaySpinner } from './utils.js';

// Fragment functions
import { createCheckoutFragment, selectors } from './fragments.js';

// Container functions
import {
  renderAddressForm,
  renderBillingAddressFormSkeleton,
  renderBillToShippingAddress,
  renderCartSummaryList,
  renderCheckoutHeader,
  renderCustomerBillingAddresses,
  renderCustomerShippingAddresses,
  renderEmptyCart,
  renderGiftOptions,
  renderLoginForm,
  renderMergedCartBanner,
  renderOrderSummary,
  renderOutOfStock,
  renderPaymentMethods,
  renderPlaceOrder,
  renderServerError,
  renderShippingAddressFormSkeleton,
  renderShippingMethods,
  renderTermsAndConditions,
  unmountEmptyCart,
} from './containers.js';

// Constants
import {
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_EMPTY_CLASS,
  LOGIN_FORM_NAME,
  PURCHASE_ORDER_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,
} from './constants.js';
import { rootLink, CUSTOMER_PO_DETAILS_PATH, ORDER_DETAILS_PATH } from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order.js';

// Checkout success block import and CSS preload
import { renderCheckoutSuccess, preloadCheckoutSuccess } from '../commerce-checkout-success/commerce-checkout-success.js';

preloadCheckoutSuccess();

export default async function decorate(block) {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');
  const permissions = events.lastPayload('auth/permissions');

  let b2bPoApi = null;
  let b2bIsPoEnabled = false;
  let b2bRenderPoSuccess = null;

  if (isB2BEnabled && permissions) {
    const [
      { renderPOSuccess },
      { PO_PERMISSIONS, ...b2bPurchaseOrderModule },
    ] = await Promise.all([
      import('../commerce-b2b-po-checkout-success/commerce-b2b-po-checkout-success.js'),
      import('@dropins/storefront-purchase-order/api.js'),
    ]);

    b2bPoApi = b2bPurchaseOrderModule;
    b2bIsPoEnabled = permissions[PO_PERMISSIONS.PO_ALL] !== false;
    b2bRenderPoSuccess = renderPOSuccess;
  }

  // Container and component references
  let emptyCart;
  let shippingForm;
  let billingForm;
  let shippingAddresses;
  let billingAddresses;

  const shippingFormRef = { current: null };
  const billingFormRef = { current: null };
  const creditCardFormRef = { current: null };
  const loaderRef = { current: null };

  setMetaTags('Checkout');
  document.title = 'Checkout';

  events.on('order/placed', () => {
    setMetaTags('Order Confirmation');
    document.title = 'Order Confirmation';
  });

  // Create the checkout layout using fragments
  const checkoutFragment = createCheckoutFragment();

  // Create scoped selector for the checkout fragment
  const getElement = createScopedSelector(checkoutFragment);

  // Get all checkout elements using centralized selectors
  const $content = getElement(selectors.checkout.content);
  const $loader = getElement(selectors.checkout.loader);
  const $mergedCartBanner = getElement(selectors.checkout.mergedCartBanner);
  const $heading = getElement(selectors.checkout.heading);
  const $emptyCart = getElement(selectors.checkout.emptyCart);
  const $serverError = getElement(selectors.checkout.serverError);
  const $outOfStock = getElement(selectors.checkout.outOfStock);
  const $login = getElement(selectors.checkout.login);
  const $shippingForm = getElement(selectors.checkout.shippingForm);
  const $billToShipping = getElement(selectors.checkout.billToShipping);
  const $delivery = getElement(selectors.checkout.delivery);
  const $paymentMethods = getElement(selectors.checkout.paymentMethods);
  const $billingForm = getElement(selectors.checkout.billingForm);
  const $orderSummary = getElement(selectors.checkout.orderSummary);
  const $cartSummary = getElement(selectors.checkout.cartSummary);
  const $placeOrder = getElement(selectors.checkout.placeOrder);
  const $giftOptions = getElement(selectors.checkout.giftOptions);
  const $termsAndConditions = getElement(selectors.checkout.termsAndConditions);

  block.appendChild(checkoutFragment);

  const handleValidation = () => validateForms([
    { name: LOGIN_FORM_NAME },
    { name: SHIPPING_FORM_NAME, ref: shippingFormRef },
    { name: BILLING_FORM_NAME, ref: billingFormRef },
    { name: PURCHASE_ORDER_FORM_NAME },
    { name: TERMS_AND_CONDITIONS_FORM_NAME },
  ]);

  const handlePlaceOrder = async ({ cartId, code }) => {
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

      const shouldPlacePurchaseOrder = isB2BEnabled && b2bIsPoEnabled && b2bPoApi;

      if (shouldPlacePurchaseOrder) {
        await b2bPoApi.placePurchaseOrder(cartId);
      } else {
        await orderApi.placeOrder(cartId);
      }
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
    b2bIsPoEnabled,
  });

  // Render the remaining containers
  const [
    _mergedCartBanner,
    _header,
    _serverError,
    _outOfStock,
    _loginForm,
    shippingFormSkeleton,
    _billToShipping,
    _shippingMethods,
    _paymentMethods,
    billingFormSkeleton,
    _orderSummary,
    _cartSummary,
    _termsAndConditions,
    _giftOptions,
  ] = await Promise.all([
    renderMergedCartBanner($mergedCartBanner),

    renderCheckoutHeader($heading, 'Checkout'),

    renderServerError($serverError, $content),

    renderOutOfStock($outOfStock),

    renderLoginForm($login),

    renderShippingAddressFormSkeleton($shippingForm),

    renderBillToShippingAddress($billToShipping, placeOrder),

    renderShippingMethods($delivery),

    renderPaymentMethods($paymentMethods, creditCardFormRef),

    renderBillingAddressFormSkeleton($billingForm),

    renderOrderSummary($orderSummary),

    renderCartSummaryList($cartSummary),

    renderTermsAndConditions($termsAndConditions),

    renderGiftOptions($giftOptions),
  ]);

  async function displayEmptyCart() {
    if (!emptyCart) {
      emptyCart = await renderEmptyCart($emptyCart);
      $content.classList.add(CHECKOUT_EMPTY_CLASS);
    }

    removeOverlaySpinner(loaderRef, $loader);
  }

  function removeEmptyCart() {
    if (!emptyCart) return;

    unmountEmptyCart();
    emptyCart = null;

    $content.classList.remove(CHECKOUT_EMPTY_CLASS);
  }

  async function initializeCheckout(data) {
    removeEmptyCart();
    await initReCaptcha(0);
    if (data.isGuest) await displayGuestAddressForms(data);
    else {
      removeOverlaySpinner(loaderRef, $loader);
      await displayCustomerAddressForms(data);
    }
  }

  async function displayGuestAddressForms(data) {
    if (isVirtualCart(data)) {
      shippingForm?.remove();
      shippingForm = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingForm) {
      shippingFormSkeleton.remove();

      shippingForm = await renderAddressForm($shippingForm, shippingFormRef, data, placeOrder, 'shipping');
    }

    if (!billingForm) {
      billingFormSkeleton.remove();

      billingForm = await renderAddressForm($billingForm, billingFormRef, data, placeOrder, 'billing');
    }
  }

  async function displayCustomerAddressForms(data) {
    if (isVirtualCart(data)) {
      shippingAddresses?.remove();
      shippingAddresses = null;
      $shippingForm.innerHTML = '';
    } else if (!shippingAddresses) {
      shippingForm?.remove();
      shippingForm = null;
      shippingFormRef.current = null;

      shippingAddresses = await renderCustomerShippingAddresses(
        $shippingForm,
        shippingFormRef,
        data,
        placeOrder,
      );
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
    if (isEmptyCart(data)) {
      await displayEmptyCart();
    } else {
      await initializeCheckout(data);
    }
  }

  async function handleCheckoutUpdated(data) {
    if (isEmptyCart(data)) {
      await displayEmptyCart();
      return;
    }

    await initializeCheckout(data);
  }

  function handleAuthenticated(authenticated) {
    if (!authenticated) return;
    removeModal();
    displayOverlaySpinner(loaderRef, $loader);
  }

  function handleCheckoutValues(payload) {
    const { isBillToShipping } = payload;
    $billingForm.style.display = isBillToShipping ? 'none' : 'block';
  }

  async function handleOrderPlaced(orderData) {
    // Clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const orderNumber = orderData.number;
    const encodedOrderRef = encodeURIComponent(orderRef);
    const encodedOrderNumber = encodeURIComponent(orderNumber);

    const url = token
      ? rootLink(`${ORDER_DETAILS_PATH}?orderRef=${encodedOrderRef}`)
      : rootLink(`${ORDER_DETAILS_PATH}?orderRef=${encodedOrderRef}&orderNumber=${encodedOrderNumber}`);

    window.history.pushState({}, '', url);

    await renderCheckoutSuccess(block, { orderData });
  }

  async function handlePurchaseOrderPlaced(poData) {
    // Clear address form data
    sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);

    const url = rootLink(`${CUSTOMER_PO_DETAILS_PATH}?poRef=${poData?.uid}`);

    window.history.pushState({}, '', url);

    if (b2bRenderPoSuccess) {
      await b2bRenderPoSuccess(block, poData);
    }
  }

  events.on('authenticated', handleAuthenticated);
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
  events.on('checkout/values', handleCheckoutValues);
  events.on('order/placed', handleOrderPlaced);
  events.on('purchase-order/placed', handlePurchaseOrderPlaced);
}
