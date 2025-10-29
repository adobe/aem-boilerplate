/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import TermsAndConditions from '@dropins/storefront-checkout/containers/TermsAndConditions.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Auth Dropin
import * as authApi from '@dropins/storefront-auth/api.js';

// Account Dropin
import Addresses from '@dropins/storefront-account/containers/Addresses.js';
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Payment Services Dropin
import { PaymentMethodCode } from '@dropins/storefront-payment-services/api.js';
import CreditCard from '@dropins/storefront-payment-services/containers/CreditCard.js';
import { render as PaymentServices } from '@dropins/storefront-payment-services/render.js';

// Order Dropin
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';

// Tools
import {
  Button,
  Header,
  provider as UI,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import { debounce, getCookie } from '@dropins/tools/lib.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';

// Checkout Dropin Libs
import {
  setAddressOnCart,
  getCartAddress,
  transformCartAddressToFormValues,
} from '@dropins/storefront-checkout/lib/utils.js';

import { swatchImageSlot } from './utils.js';

// Constants
import {
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_ERROR_CLASS,
  CHECKOUT_HEADER_CLASS,
  DEBOUNCE_TIME,
  LOGIN_FORM_NAME,
  USER_TOKEN_COOKIE_NAME,
} from './constants.js';

// External dependencies
import { rootLink } from '../../scripts/commerce.js';

/**
 * Container IDs for registry management
 * @enum {string}
 */
export const CONTAINERS = Object.freeze({
  // Static containers (rendered in Promise.all)
  CHECKOUT_HEADER: 'checkoutHeader',
  SERVER_ERROR: 'serverError',
  LOGIN_FORM: 'loginForm',
  SHIPPING_ADDRESS_FORM_SKELETON: 'shippingAddressFormSkeleton',
  BILL_TO_SHIPPING_ADDRESS: 'billToShippingAddress',
  SHIPPING_METHODS: 'shippingMethods',
  PAYMENT_METHODS: 'paymentMethods',
  BILLING_ADDRESS_FORM_SKELETON: 'billingAddressFormSkeleton',
  TERMS_AND_CONDITIONS: 'termsAndConditions',
  PLACE_ORDER_BUTTON: 'placeOrderButton',
  GIFT_OPTIONS: 'giftOptions',
  CUSTOMER_BILLING_ADDRESSES: 'customerBillingAddresses',

  // Dynamic containers (conditional rendering)
  BILLING_ADDRESS_FORM: 'billingAddressForm',

  // Order confirmation containers
  ORDER_HEADER: 'orderHeader',
  ORDER_STATUS: 'orderStatus',
  SHIPPING_STATUS: 'shippingStatus',
  CUSTOMER_DETAILS: 'customerDetails',
  ORDER_COST_SUMMARY: 'orderCostSummary',
  ORDER_GIFT_OPTIONS: 'orderGiftOptions',
  ORDER_PRODUCT_LIST: 'orderProductList',
  ORDER_CONFIRMATION_FOOTER_BUTTON: 'orderConfirmationFooterButton',
});

/**
 * A Map to store the API of rendered containers.
 * The key is a unique string ID, and the value is the containers's API object.
 * (e.g., { setProps: (props) => {...}, remove: () => {...} })
 */
const registry = new Map();

/**
 * Checks if a container with the given ID has been rendered.
 * This is used to prevent multiple instances of the same container from being rendered.
 * @param {string} id - The unique ID of the container to check.
 * @returns {boolean} - Returns true if the container has been rendered, false otherwise.
 */
export const hasContainer = (id) => registry.has(id);

/**
 * Helper to get a container from the registry or render and register it if not present.
 * @async
 * @param {string} id - Unique identifier for the container.
 * @param {Function} renderFn - Async function that renders the container.
 * @returns {Promise<Object>} - The rendered container API.
 */
const renderContainer = async (id, renderFn) => {
  if (registry.has(id)) {
    return registry.get(id);
  }

  try {
    const container = await renderFn();
    registry.set(id, container);
    return container;
  } catch (error) {
    console.error(`Error rendering container ${id}:`, error);
    throw error;
  }
};

/**
 * Unmounts and removes a container from the registry.
 * This function checks if the container is registered, removes it from the DOM,
 * and deletes its reference from the registry.
 * @param {string} id - The unique ID of the container to unmount.
 * @return {void}
 */
export const unmountContainer = (id) => {
  if (!registry.has(id)) {
    return;
  }

  const containerApi = registry.get(id);
  containerApi.remove();
  registry.delete(id);
};

/**
 * Renders the checkout page header with title and styling
 * @param {HTMLElement} container - DOM element to render the header in
 * @param {string} title - The title to display in the header
 * @returns {Promise<Object>} - The rendered checkout header component
 */
export const renderCheckoutHeader = async (container, title) => renderContainer(
  CONTAINERS.CHECKOUT_HEADER,
  async () => UI.render(Header, {
    className: CHECKOUT_HEADER_CLASS,
    divider: true,
    level: 1,
    size: 'large',
    title,
  })(container),
);

/**
 * Renders server error handling with retry functionality and error state management
 * @param {HTMLElement} container - DOM element to render the error component in
 * @param {HTMLElement} contentElement - Main content element to add error styling to
 * @returns {Promise<Object>} - The rendered server error component
 */
export const renderServerError = async (container, contentElement) => renderContainer(
  CONTAINERS.SERVER_ERROR,
  async () => CheckoutProvider.render(ServerError, {
    autoScroll: true,
    onRetry: (error) => {
      if (error.code === 'QUOTE_PERMISSION_DENIED' || error.code === 'QUOTE_DATA_ERROR') {
        document.location.reload();
        return;
      }

      contentElement.classList.remove(CHECKOUT_ERROR_CLASS);
    },
    onServerError: () => {
      contentElement.classList.add(CHECKOUT_ERROR_CLASS);
    },
  })(container),
);

/**
 * Renders the login form for guest checkout with authentication options
 * Uses the existing 'authenticated' event system for decoupled communication
 * @param {HTMLElement} container - DOM element to render the login form in
 * @returns {Promise<Object>} - The rendered login form component
 */
export const renderLoginForm = async (container) => renderContainer(
  CONTAINERS.LOGIN_FORM,
  async () => CheckoutProvider.render(LoginForm, {
    name: LOGIN_FORM_NAME,
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
  })(container),
);

/**
 * Renders the shipping address form skeleton (initial placeholder)
 * @param {HTMLElement} container - DOM element to render the form in
 * @returns {Promise<Object>} - The rendered shipping address form skeleton
 */
export const renderShippingAddressFormSkeleton = async (container) => renderContainer(
  CONTAINERS.SHIPPING_ADDRESS_FORM_SKELETON,
  async () => AccountProvider.render(AddressForm, {
    fieldIdPrefix: 'shipping',
    isOpen: true,
    showFormLoader: true,
  })(container),
);

/**
 * Renders the billing address form skeleton (initial placeholder)
 * @param {HTMLElement} container - DOM element to render the form in
 * @returns {Promise<Object>} - The rendered billing address form skeleton
 */
export const renderBillingAddressFormSkeleton = async (container) => renderContainer(
  CONTAINERS.BILLING_ADDRESS_FORM_SKELETON,
  async () => AccountProvider.render(AddressForm, {
    fieldIdPrefix: 'billing',
    isOpen: true,
    showFormLoader: true,
  })(container),
);

/**
 * Renders checkbox to set billing address same as shipping address - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render the checkbox in
 * @param {Object} placeOrderButton - Optional place order button reference for state management
 * @returns {Promise<Object>} - The rendered bill to shipping address component
 */
export const renderBillToShippingAddress = async (container, placeOrderButton = null) => renderContainer(
  CONTAINERS.BILL_TO_SHIPPING_ADDRESS,
  async () => {
    // Create setAddressOnCart with optional place order button
    const setBillingAddressOnCart = setAddressOnCart({
      type: 'billing',
      debounceMs: DEBOUNCE_TIME,
      placeOrderBtn: placeOrderButton, // Optional - will be null initially
    });

    return CheckoutProvider.render(BillToShippingAddress, {
      onChange: (checked) => {
        const billingFormValues = events.lastPayload('checkout/addresses/billing');

        if (!checked && billingFormValues) {
          setBillingAddressOnCart(billingFormValues);
        }
      },
    })(container);
  },
);

/**
 * Renders available shipping methods with selection interface
 * @param {HTMLElement} container - DOM element to render shipping methods in
 * @returns {Promise<Object>} - The rendered shipping methods component
 */
export const renderShippingMethods = async (container) => renderContainer(
  CONTAINERS.SHIPPING_METHODS,
  async () => CheckoutProvider.render(ShippingMethods)(container),
);

/**
 * Renders payment methods with credit card integration - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render payment methods in
 * @param {Object} creditCardFormRef - React-style ref for credit card form
 * @returns {Promise<Object>} - The rendered payment methods component
 */
export const renderPaymentMethods = async (container, creditCardFormRef) => renderContainer(
  CONTAINERS.PAYMENT_METHODS,
  async () => {
    // Retrieve constants internally to minimize parameters
    const commerceCoreEndpoint = getConfigValue('commerce-core-endpoint') || getConfigValue('commerce-endpoint');
    const getUserTokenCookie = () => getCookie(USER_TOKEN_COOKIE_NAME);

    return CheckoutProvider.render(PaymentMethods, {
      slots: {
        Methods: {
          [PaymentMethodCode.CREDIT_CARD]: {
            render: (ctx) => {
              const $creditCard = document.createElement('div');

              PaymentServices.render(CreditCard, {
                apiUrl: commerceCoreEndpoint,
                getCustomerToken: getUserTokenCookie,
                getCartId: () => ctx.cartId,
                creditCardFormRef,
              })($creditCard);

              ctx.replaceHTML($creditCard);
            },
          },
          [PaymentMethodCode.SMART_BUTTONS]: {
            enabled: false,
          },
          [PaymentMethodCode.APPLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.GOOGLE_PAY]: {
            enabled: false,
          },
          [PaymentMethodCode.VAULT]: {
            enabled: false,
          },
          [PaymentMethodCode.FASTLANE]: {
            enabled: false,
          },
        },
      },
    })(container);
  },
);

/**
 * Renders terms and conditions with agreement slots and manual consent mode
 * @param {HTMLElement} container - DOM element to render the terms in
 * @returns {Promise<Object>} - The rendered terms and conditions component
 */
export const renderTermsAndConditions = async (container) => renderContainer(
  CONTAINERS.TERMS_AND_CONDITIONS,
  async () => CheckoutProvider.render(TermsAndConditions, {
    slots: {
      Agreements: (ctx) => {
        ctx.appendAgreement(() => ({
          name: 'default',
          mode: 'manual',
          translationId: 'Checkout.TermsAndConditions.label',
        }));
      },
    },
  })(container),
);

/**
 * Renders place order button with handler functions - follows multi-step pattern
 * @param {HTMLElement} container - DOM element to render the place order button in
 * @param {Object} options - Configuration object with handler functions
 * @param {Function} options.handleValidation - Validation handler function
 * @param {Function} options.handlePlaceOrder - Place order handler function
 * @returns {Promise<Object>} - The rendered place order component
 */
export const renderPlaceOrder = async (container, options = {}) => renderContainer(
  CONTAINERS.PLACE_ORDER_BUTTON,
  async () => CheckoutProvider.render(PlaceOrder, {
    handleValidation: options.handleValidation,
    handlePlaceOrder: options.handlePlaceOrder,
  })(container),
);

/**
 * Renders customer billing addresses selector/form for authenticated users - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render billing addresses in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing billing address information
 * @param {Object} placeOrderButton - Place order button reference
 * @returns {Promise<Object>} - The rendered customer billing addresses component
 */
export const renderCustomerBillingAddresses = async (container, formRef, data, placeOrderButton) => renderContainer(
  CONTAINERS.CUSTOMER_BILLING_ADDRESSES,
  async () => {
    const cartBillingAddress = getCartAddress(data, 'billing');

    const customerBillingAddressUid = cartBillingAddress
      ? cartBillingAddress?.customerAddressUid ?? 0
      : undefined;

    const billingAddressCache = sessionStorage.getItem(BILLING_ADDRESS_DATA_KEY);

    // Clear persisted billing address if cart has a billing address
    if (cartBillingAddress && billingAddressCache) {
      sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
    }

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.customerAddressUid === undefined
      ? transformCartAddressToFormValues(cartBillingAddress)
      : { countryCode: storeConfig.defaultCountry };

    const hasCartBillingAddress = Boolean(data.billingAddress);
    let isFirstRenderBilling = true;

    // Create address setter with constants moved inside
    const setBillingAddressOnCart = setAddressOnCart({
      type: 'billing',
      debounceMs: DEBOUNCE_TIME,
      placeOrderBtn: placeOrderButton,
    });

    const notifyBillingValues = debounce((values) => {
      events.emit('checkout/addresses/billing', values);
    }, ADDRESS_INPUT_DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: 'Bill to new address',
      defaultSelectAddressId: customerBillingAddressUid,
      formName: BILLING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      onAddressData: (values) => {
        const canSetBillingAddressOnCart = !isFirstRenderBilling || !hasCartBillingAddress;
        if (canSetBillingAddressOnCart) setBillingAddressOnCart(values);
        if (isFirstRenderBilling) isFirstRenderBilling = false;
        notifyBillingValues(values);
      },
      selectable: true,
      selectBilling: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: 'Billing address',
    })(container);
  },
);

/**
 * Renders order-level gift options with swatch image integration
 * @param {HTMLElement} container - DOM element to render gift options in
 * @returns {Promise<Object>} - The rendered gift options component
 */
export const renderGiftOptions = async (container) => renderContainer(
  CONTAINERS.GIFT_OPTIONS,
  async () => CartProvider.render(GiftOptions, {
    view: 'order',
    dataSource: 'cart',
    isEditable: false,
    slots: {
      SwatchImage: swatchImageSlot,
    },
  })(container),
);

/**
 * Renders order confirmation header with email check and sign up integration
 * @param {HTMLElement} container - DOM element to render the order header in
 * @param {Object} options - Configuration object with handlers and order data
 * @returns {Promise<Object>} - The rendered order header component
 */
export const renderOrderHeader = async (container, options = {}) => renderContainer(
  CONTAINERS.ORDER_HEADER,
  async () => OrderProvider.render(OrderHeader, { ...options })(container)
  ,
);

/**
 * Renders the order status component
 * @param {HTMLElement} container - The DOM element to render the order status in
 * @returns {Promise<Object>} - The rendered order status component
 */
export const renderOrderStatus = async (container) => renderContainer(
  CONTAINERS.ORDER_STATUS,
  async () => OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(container),
);

/**
 * Renders the shipping status component
 * @param {HTMLElement} container - The DOM element to render the shipping status in
 * @returns {Promise<Object>} - The rendered shipping status component
 */
export const renderShippingStatus = async (container) => renderContainer(
  CONTAINERS.SHIPPING_STATUS,
  async () => OrderProvider.render(ShippingStatus)(container),
);

/**
 * Renders the customer details component
 * @param {HTMLElement} container - The DOM element to render the customer details in
 * @returns {Promise<Object>} - The rendered customer details component
 */
export const renderCustomerDetails = async (container) => renderContainer(
  CONTAINERS.CUSTOMER_DETAILS,
  async () => OrderProvider.render(CustomerDetails)(container),
);

/**
 * Renders the order cost summary component
 * @param {HTMLElement} container - The DOM element to render the order cost summary in
 * @returns {Promise<Object>} - The rendered order cost summary component
 */
export const renderOrderCostSummary = async (container) => renderContainer(
  CONTAINERS.ORDER_COST_SUMMARY,
  async () => OrderProvider.render(OrderCostSummary)(container),
);

/**
 * Renders the order product list component with image slots and gift options
 * @param {HTMLElement} container - The DOM element to render the order product list in
 * @returns {Promise<Object>} - The rendered order product list component
 */
export const renderOrderProductList = async (container) => renderContainer(
  CONTAINERS.ORDER_PRODUCT_LIST,
  async () => OrderProvider.render(OrderProductList, {
    slots: {
      Footer: (ctx) => {
        const giftOptions = document.createElement('div');
        CartProvider.render(GiftOptions, {
          item: ctx.item,
          view: 'product',
          dataSource: 'order',
          isEditable: false,
          slots: {
            SwatchImage: swatchImageSlot,
          },
        })(giftOptions);
        ctx.appendChild(giftOptions);
      },
      CartSummaryItemImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
    },
  })(container),
);

/**
 * Renders order-level gift options for order confirmation
 * @param {HTMLElement} container - DOM element to render order gift options in
 * @returns {Promise<Object>} - The rendered order gift options component
 */
export const renderOrderGiftOptions = async (container) => renderContainer(
  CONTAINERS.ORDER_GIFT_OPTIONS,
  async () => CartProvider.render(GiftOptions, {
    view: 'order',
    dataSource: 'order',
    isEditable: false,
    readOnlyFormOrderView: 'secondary',
    slots: {
      SwatchImage: swatchImageSlot,
    },
  })(container),
);

/**
 * Renders the continue shopping button for order confirmation footer
 * @param {HTMLElement} container - DOM element to render the button in
 * @returns {Promise<Object>} - The rendered continue shopping button component
 */
export const renderOrderConfirmationFooterButton = async (container) => renderContainer(
  CONTAINERS.ORDER_CONFIRMATION_FOOTER_BUTTON,
  async () => UI.render(Button, {
    children: 'Continue shopping',
    'data-testid': 'order-confirmation-footer__continue-button',
    className: 'order-confirmation-footer__continue-button',
    size: 'medium',
    variant: 'primary',
    type: 'submit',
    href: rootLink('/'),
  })(container),
);
