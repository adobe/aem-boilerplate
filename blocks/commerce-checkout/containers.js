/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */

// Checkout Dropin
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ServerError from '@dropins/storefront-checkout/containers/ServerError.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import TermsAndConditions from '@dropins/storefront-checkout/containers/TermsAndConditions.js';
import { render as CheckoutProvider } from '@dropins/storefront-checkout/render.js';

// Auth Dropin
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Account Dropin
import Addresses from '@dropins/storefront-account/containers/Addresses.js';
import AddressForm from '@dropins/storefront-account/containers/AddressForm.js';
import { render as AccountProvider } from '@dropins/storefront-account/render.js';

// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import Coupons from '@dropins/storefront-cart/containers/Coupons.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import GiftCards from '@dropins/storefront-cart/containers/GiftCards.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
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
  estimateShippingCost,
  setAddressOnCart,
  getCartAddress,
  transformCartAddressToFormValues,
} from '@dropins/storefront-checkout/lib/utils.js';

import { showModal, swatchImageSlot } from './utils.js';

// External dependencies
import {
  authPrivacyPolicyConsentSlot,
  rootLink,
} from '../../scripts/commerce.js';

// Constants
import {
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  CHECKOUT_ERROR_CLASS,
  CHECKOUT_HEADER_CLASS,
  DEBOUNCE_TIME,
  LOGIN_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
  USER_TOKEN_COOKIE_NAME,
} from './constants.js';

/**
 * Container IDs for registry management
 * @enum {string}
 */
export const CONTAINERS = Object.freeze({
  // Static containers (rendered in Promise.all)
  MERGED_CART_BANNER: 'mergedCartBanner',
  CHECKOUT_HEADER: 'checkoutHeader',
  SERVER_ERROR: 'serverError',
  OUT_OF_STOCK: 'outOfStock',
  LOGIN_FORM: 'loginForm',
  SHIPPING_ADDRESS_FORM_SKELETON: 'shippingAddressFormSkeleton',
  BILL_TO_SHIPPING_ADDRESS: 'billToShippingAddress',
  SHIPPING_METHODS: 'shippingMethods',
  PAYMENT_METHODS: 'paymentMethods',
  BILLING_ADDRESS_FORM_SKELETON: 'billingAddressFormSkeleton',
  ORDER_SUMMARY: 'orderSummary',
  CART_SUMMARY_LIST: 'cartSummaryList',
  TERMS_AND_CONDITIONS: 'termsAndConditions',
  PLACE_ORDER_BUTTON: 'placeOrderButton',
  GIFT_OPTIONS: 'giftOptions',
  CUSTOMER_SHIPPING_ADDRESSES: 'customerShippingAddresses',
  CUSTOMER_BILLING_ADDRESSES: 'customerBillingAddresses',

  // Dynamic containers (conditional rendering)
  EMPTY_CART: 'emptyCart',
  SHIPPING_ADDRESS_FORM: 'shippingAddressForm',
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

  // Slot/Sub-containers (nested within other containers)
  ESTIMATE_SHIPPING: 'estimateShipping',
  CART_COUPONS: 'cartCoupons',
  GIFT_CARDS: 'giftCards',
  CART_GIFT_OPTIONS: 'cartGiftOptions',
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
 * Renders the empty cart container
 * @param {HTMLElement} container - The DOM element where the empty cart should be rendered
 * @returns {Promise<Object>} - The rendered empty cart component
 */
export const renderEmptyCart = async (container) => renderContainer(
  CONTAINERS.EMPTY_CART,
  async () => CartProvider.render(EmptyCart, {
    routeCTA: () => rootLink('/'),
  })(container),
);

export const unmountEmptyCart = () => {
  unmountContainer(CONTAINERS.EMPTY_CART);
};

/**
 * Renders the merged cart banner notification for authenticated users
 * @param {HTMLElement} container - DOM element to render the banner in
 * @returns {Promise<Object>} - The rendered merged cart banner component
 */
export const renderMergedCartBanner = async (container) => renderContainer(
  CONTAINERS.MERGED_CART_BANNER,
  async () => CheckoutProvider.render(MergedCartBanner)(container),
);

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
    onRetry: () => {
      contentElement.classList.remove(CHECKOUT_ERROR_CLASS);
    },
    onServerError: () => {
      contentElement.classList.add(CHECKOUT_ERROR_CLASS);
    },
  })(container),
);

/**
 * Renders out of stock handling with cart navigation and product update options
 * @param {HTMLElement} container - DOM element to render the component in
 * @returns {Promise<Object>} - The rendered out-of-stock component
 */
export const renderOutOfStock = async (container) => renderContainer(
  CONTAINERS.OUT_OF_STOCK,
  async () => CheckoutProvider.render(OutOfStock, {
    routeCart: () => rootLink('/cart'),
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
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
    onSignInClick: async (initialEmailValue) => {
      const signInForm = document.createElement('div');

      AuthProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          initialEmailValue,
          // No onSuccessCallback needed - the 'authenticated' event will be fired automatically
        },
        signUpFormConfig: {
          slots: {
            ...authPrivacyPolicyConsentSlot,
          },
        },
        resetPasswordFormConfig: {},
      })(signInForm);

      await showModal(signInForm);
    },
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
 * Renders estimate shipping form for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderEstimateShipping = (ctx) => {
  const estimateShippingForm = document.createElement('div');
  CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
  ctx.appendChild(estimateShippingForm);
};

/**
 * Renders cart coupons for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderCartCoupons = (ctx) => {
  const coupons = document.createElement('div');
  CartProvider.render(Coupons)(coupons);
  ctx.appendChild(coupons);
};

/**
 * Renders gift cards for order summary slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderGiftCards = (ctx) => {
  const giftCards = document.createElement('div');
  CartProvider.render(GiftCards)(giftCards);
  ctx.appendChild(giftCards);
};

/**
 * Renders gift options for cart summary list footer slot
 * @param {HTMLElement} ctx - The slot context element
 * @returns {void}
 */
export const renderCartGiftOptions = (ctx) => {
  const giftOptions = document.createElement('div');

  CartProvider.render(GiftOptions, {
    item: ctx.item,
    view: 'product',
    dataSource: 'cart',
    isEditable: false,
    handleItemsLoading: ctx.handleItemsLoading,
    handleItemsError: ctx.handleItemsError,
    onItemUpdate: ctx.onItemUpdate,
    slots: {
      SwatchImage: swatchImageSlot,
    },
  })(giftOptions);

  ctx.appendChild(giftOptions);
};

// ============================================================================
// SUMMARY CONTAINERS
// ============================================================================

/**
 * Renders order summary with estimate shipping, coupons, and gift cards slots
 * @param {HTMLElement} container - DOM element to render order summary in
 * @returns {Promise<Object>} - The rendered order summary component
 */
export const renderOrderSummary = async (container) => renderContainer(
  CONTAINERS.ORDER_SUMMARY,
  async () => CartProvider.render(OrderSummary, {
    slots: {
      EstimateShipping: renderEstimateShipping,
      Coupons: renderCartCoupons,
      GiftCards: renderGiftCards,
    },
  })(container),
);

/**
 * Renders cart summary list with custom heading, thumbnail and gift options slots
 * @param {HTMLElement} container - DOM element to render cart summary list in
 * @returns {Promise<Object>} - The rendered cart summary list component
 */
export const renderCartSummaryList = async (container) => renderContainer(
  CONTAINERS.CART_SUMMARY_LIST,
  async () => CartProvider.render(CartSummaryList, {
    variant: 'secondary',
    slots: {
      Heading: (headingCtx) => {
        const title = 'Your Cart ({count})';

        const cartSummaryListHeading = document.createElement('div');
        cartSummaryListHeading.classList.add('cart-summary-list__heading');

        const cartSummaryListHeadingText = document.createElement('div');
        cartSummaryListHeadingText.classList.add(
          'cart-summary-list__heading-text',
        );

        cartSummaryListHeadingText.innerText = title.replace(
          '({count})',
          headingCtx.count ? `(${headingCtx.count})` : '',
        );
        const editCartLink = document.createElement('a');
        editCartLink.classList.add('cart-summary-list__edit');
        editCartLink.href = rootLink('/cart');
        editCartLink.rel = 'noreferrer';
        editCartLink.innerText = 'Edit';

        cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
        cartSummaryListHeading.appendChild(editCartLink);
        headingCtx.appendChild(cartSummaryListHeading);

        headingCtx.onChange((nextHeadingCtx) => {
          cartSummaryListHeadingText.innerText = title.replace(
            '({count})',
            nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
          );
        });
      },
      Thumbnail: (ctx) => {
        const { item, defaultImageProps } = ctx;
        tryRenderAemAssetsImage(ctx, {
          alias: item.sku,
          imageProps: defaultImageProps,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
      Footer: renderCartGiftOptions,
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
 * Renders customer shipping addresses selector/form for authenticated users - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render shipping addresses in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing shipping address information
 * @param {Object} placeOrderButton - Place order button reference
 * @returns {Promise<Object>} - The rendered customer shipping addresses component
 */
export const renderCustomerShippingAddresses = async (container, formRef, data, placeOrderButton) => renderContainer(
  CONTAINERS.CUSTOMER_SHIPPING_ADDRESSES,
  async () => {
    const cartShippingAddress = getCartAddress(data, 'shipping');

    const shippingAddressId = cartShippingAddress
      ? cartShippingAddress?.id ?? 0
      : undefined;

    const shippingAddressCache = sessionStorage.getItem(SHIPPING_ADDRESS_DATA_KEY);

    // Clear persisted shipping address if cart has a shipping address
    if (cartShippingAddress && shippingAddressCache) {
      sessionStorage.removeItem(SHIPPING_ADDRESS_DATA_KEY);
    }

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartShippingAddress && cartShippingAddress.id === undefined
      ? transformCartAddressToFormValues(cartShippingAddress)
      : { countryCode: storeConfig.defaultCountry };

    const hasCartShippingAddress = Boolean(data.shippingAddresses?.[0]);
    let isFirstRenderShipping = true;

    // Create address setters with constants moved inside
    const setShippingAddressOnCart = setAddressOnCart({
      type: 'shipping',
      debounceMs: DEBOUNCE_TIME,
      placeOrderBtn: placeOrderButton,
    });

    const estimateShippingCostOnCart = estimateShippingCost({
      debounceMs: DEBOUNCE_TIME,
    });

    const notifyShippingValues = debounce((values) => {
      events.emit('checkout/addresses/shipping', values);
    }, ADDRESS_INPUT_DEBOUNCE_TIME);

    return AccountProvider.render(Addresses, {
      addressFormTitle: 'Deliver to new address',
      defaultSelectAddressId: shippingAddressId,
      fieldIdPrefix: 'shipping',
      formName: SHIPPING_FORM_NAME,
      forwardFormRef: formRef,
      inputsDefaultValueSet,
      minifiedView: false,
      onAddressData: (values) => {
        const canSetShippingAddressOnCart = !isFirstRenderShipping || !hasCartShippingAddress;
        if (canSetShippingAddressOnCart) setShippingAddressOnCart(values);
        if (!hasCartShippingAddress) estimateShippingCostOnCart(values);
        if (isFirstRenderShipping) isFirstRenderShipping = false;
        notifyShippingValues(values);
      },
      selectable: true,
      selectShipping: true,
      showBillingCheckBox: false,
      showSaveCheckBox: true,
      showShippingCheckBox: false,
      title: 'Shipping address',
    })(container);
  },
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

    const billingAddressId = cartBillingAddress
      ? cartBillingAddress?.id ?? 0
      : undefined;

    const billingAddressCache = sessionStorage.getItem(BILLING_ADDRESS_DATA_KEY);

    // Clear persisted billing address if cart has a billing address
    if (cartBillingAddress && billingAddressCache) {
      sessionStorage.removeItem(BILLING_ADDRESS_DATA_KEY);
    }

    const storeConfig = checkoutApi.getStoreConfigCache();

    const inputsDefaultValueSet = cartBillingAddress && cartBillingAddress.id === undefined
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
      defaultSelectAddressId: billingAddressId,
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
 * Renders address form for guest users (shipping or billing) - original regular checkout functionality
 * @param {HTMLElement} container - DOM element to render address form in
 * @param {Object} formRef - React-style ref for form reference
 * @param {Object} data - Cart data containing address information
 * @param {Object} placeOrderButton - Place order button reference
 * @param {string} addressType - Type of address form ('shipping' or 'billing')
 * @returns {Promise<Object>} - The rendered address form component
 */
export const renderAddressForm = async (container, formRef, data, placeOrderButton, addressType) => {
  const isShipping = addressType === 'shipping';
  const containerKey = isShipping ? CONTAINERS.SHIPPING_ADDRESS_FORM : CONTAINERS.BILLING_ADDRESS_FORM;

  return renderContainer(
    containerKey,
    async () => {
      // Get address type specific configurations
      const cartAddress = getCartAddress(data, addressType);
      const addressDataKey = isShipping ? SHIPPING_ADDRESS_DATA_KEY : BILLING_ADDRESS_DATA_KEY;
      const addressCache = sessionStorage.getItem(addressDataKey);

      // Clear persisted address if cart has an address
      if (cartAddress && addressCache) {
        sessionStorage.removeItem(addressDataKey);
      }

      let isFirstRender = true;
      const hasCartAddress = Boolean(isShipping ? data.shippingAddresses?.[0] : data.billingAddress);

      // Create address setter with appropriate API
      const setAddressOnCartFn = setAddressOnCart({
        type: isShipping ? 'shipping' : 'billing',
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrderButton,
      });

      // Create shipping cost estimator (only for shipping addresses)
      const estimateShippingCostOnCart = isShipping ? estimateShippingCost({
        debounceMs: DEBOUNCE_TIME,
      }) : null;

      const notifyValues = debounce((values) => {
        const eventType = isShipping ? 'checkout/addresses/shipping' : 'checkout/addresses/billing';
        events.emit(eventType, values);
      }, ADDRESS_INPUT_DEBOUNCE_TIME);

      const storeConfig = checkoutApi.getStoreConfigCache();

      // Address type specific configurations
      const formName = isShipping ? SHIPPING_FORM_NAME : BILLING_FORM_NAME;
      const addressTitle = isShipping ? 'Shipping address' : 'Billing address';
      const className = isShipping
        ? 'checkout-shipping-form__address-form'
        : 'checkout-billing-form__address-form';

      const inputsDefaultValueSet = cartAddress
        ? transformCartAddressToFormValues(cartAddress)
        : { countryCode: storeConfig.defaultCountry };

      return AccountProvider.render(AddressForm, {
        addressesFormTitle: addressTitle,
        className,
        fieldIdPrefix: addressType,
        formName,
        forwardFormRef: formRef,
        hideActionFormButtons: true,
        inputsDefaultValueSet,
        isOpen: true,
        onChange: (values) => {
          const canSetAddressOnCart = !isFirstRender || !hasCartAddress;
          if (canSetAddressOnCart) setAddressOnCartFn(values);

          // Only estimate shipping cost for shipping addresses when no cart address exists
          if (isShipping && !hasCartAddress && estimateShippingCostOnCart) {
            estimateShippingCostOnCart(values);
          }

          if (isFirstRender) isFirstRender = false;

          notifyValues(values);
        },
        showBillingCheckBox: false,
        showFormLoader: false,
        showShippingCheckBox: false,
      })(container);
    },
  );
};

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
  async () => {
    const handleSignUpClick = async ({
      inputsDefaultValueSet,
      addressesData,
    }) => {
      const signUpForm = document.createElement('div');

      AuthProvider.render(SignUp, {
        inputsDefaultValueSet,
        addressesData,
        routeSignIn: () => rootLink('/customer/login'),
        routeRedirectOnEmailConfirmationClose: () => rootLink('/customer/account'),
        slots: {
          ...authPrivacyPolicyConsentSlot,
        },
      })(signUpForm);

      await showModal(signUpForm);
    };

    return OrderProvider.render(OrderHeader, {
      handleEmailAvailability: checkoutApi.isEmailAvailable,
      handleSignUpClick,
      ...options,
    })(container);
  },
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
