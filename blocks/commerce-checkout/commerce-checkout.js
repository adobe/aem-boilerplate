// Dropin Tools
import {
  Divider,
  ProgressSpinner,
  provider as uiProvider,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';

// Cart Dropin Modules
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import BillToShippingAddress from '@dropins/storefront-checkout/containers/BillToShippingAddress.js';
import BillingForm from '@dropins/storefront-checkout/containers/BillingForm.js';
import ErrorBanner from '@dropins/storefront-checkout/containers/ErrorBanner.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import LoginForm from '@dropins/storefront-checkout/containers/LoginForm.js';
import MergedCartBanner from '@dropins/storefront-checkout/containers/MergedCartBanner.js';
import OutOfStock from '@dropins/storefront-checkout/containers/OutOfStock.js';
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import PlaceOrder from '@dropins/storefront-checkout/containers/PlaceOrder.js';
import ShippingForm from '@dropins/storefront-checkout/containers/ShippingForm.js';
import ShippingMethods from '@dropins/storefront-checkout/containers/ShippingMethods.js';
import { render as checkoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Confirmation Dropin Modules
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';
import { render as orderConfirmationProvider } from '@dropins/storefront-order-confirmation/render.js';

// Auth Dropin Modules
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import { createModal } from '../modal/modal.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_LOGIN_PATH } from '../../scripts/constants.js';

// Initializers
import '../../scripts/initializers/auth.js';
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/checkout.js';
import '../../scripts/initializers/order-confirmation.js';

function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

/*
 * Layout DOM elements
 */

const root = createElementWithClass('div', 'checkout__content');
const heading = createElementWithClass('div', 'checkout__heading');
const headingTitle = createElementWithClass('h1', 'checkout__heading-title');
const headingDivider = createElementWithClass(
  'div',
  'checkout__heading-divider',
);
const main = createElementWithClass('div', 'checkout__main');
const aside = createElementWithClass('div', 'checkout__aside');
const placeOrder = createElementWithClass('div', 'checkout__place-order');
const emptyCart = createElementWithClass('div', 'checkout__empty-cart');
const errorBanner = createElementWithClass('div', 'checkout__error-banner');
const mergedCartBanner = createElementWithClass(
  'div',
  'checkout__merged-cart-banner',
);
const overlaySpinner = createElementWithClass(
  'div',
  'checkout__overlay-spinner',
);
const outOfStock = createElementWithClass('div', 'checkout__out-of-stock');
const login = createElementWithClass('div', 'checkout__login');
const shippingForm = createElementWithClass('div', 'checkout__shipping-form');
const billToShippingAddress = createElementWithClass(
  'div',
  'checkout__bill-to-shipping-address',
);
const billingForm = createElementWithClass('div', 'checkout__billing-form');
const shippingMethods = createElementWithClass(
  'div',
  'checkout__shipping-methods',
);
const paymentMethods = createElementWithClass(
  'div',
  'checkout__payment-methods',
);
const orderSummary = createElementWithClass('div', 'checkout__order-summary');
const cartSummaryList = createElementWithClass('div', 'cart-summary-list');

headingTitle.textContent = 'Checkout';
heading.replaceChildren(headingTitle, headingDivider);

/*
 * Layout responsive handling
 */

const mediaQuery = matchMedia('(max-width: 768px)');

function renderMobileLayout(block) {
  root.replaceChildren(
    errorBanner,
    mergedCartBanner,
    heading,
    cartSummaryList,
    outOfStock,
    login,
    shippingForm,
    billToShippingAddress,
    billingForm,
    shippingMethods,
    paymentMethods,
    orderSummary,
    placeOrder,
    overlaySpinner,
  );

  block.replaceChildren(root);
}

function renderDesktopLayout(block) {
  main.replaceChildren(
    heading,
    outOfStock,
    login,
    shippingForm,
    billToShippingAddress,
    billingForm,
    shippingMethods,
    paymentMethods,
  );

  aside.replaceChildren(orderSummary, cartSummaryList);

  root.replaceChildren(
    errorBanner,
    mergedCartBanner,
    main,
    aside,
    placeOrder,
    overlaySpinner,
  );

  block.replaceChildren(root);
}

/*
 * Event handlers
 */

let modal = null;
function handleAuthenticated(isAuthenticated) {
  if (isAuthenticated && modal) {
    modal.removeModal();
    modal = null;
  }

  if (isAuthenticated) {
    overlaySpinner.classList.add('checkout__overlay-spinner--shown');
  }
}

let currentCheckoutData;
function handleCheckoutData(nextCheckoutData, block) {
  if (currentCheckoutData !== undefined) {
    // on sign out
    if (!nextCheckoutData) {
      root.classList.add('checkout-empty-cart');
      root.replaceChildren(heading, emptyCart);
      // mediaQuery.removeEventListener('change', handleScreenResize);
      return;
    }

    // on empty state
    if (nextCheckoutData.isEmpty) {
      root.classList.add('checkout-empty-cart');
      root.replaceChildren(heading, emptyCart);
      // mediaQuery.removeEventListener('change', handleScreenResize);
      return;
    }

    root.classList.remove('checkout-empty-cart');
    // mediaQuery.addEventListener('change', (e) => handleScreenResize(e, block));
    handleScreenResize(mediaQuery, block);
  }

  currentCheckoutData = nextCheckoutData;
}

function handleCheckoutCustomer(nextCheckoutCustomer) {
  if (nextCheckoutCustomer) {
    overlaySpinner.classList.remove('checkout__overlay-spinner--shown');
  }
}

function handleScreenResize(e, block) {
  if (e.matches) {
    renderMobileLayout(block);
  } else {
    renderDesktopLayout(block);
  }
}

function handleCheckoutOrder(orderData, block) {
  const token = getUserTokenCookie();
  const orderRef = token ? orderData.number : orderData.token;
  const encodedOrderRef = encodeURIComponent(orderRef);

  window.history.pushState({}, '', `/order-status?orderRef=${encodedOrderRef}`);

  const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
    const signUpForm = document.createElement('div');

    authProvider.render(SignUp, {
      routeSignIn: () => CUSTOMER_LOGIN_PATH,
      routeRedirectOnEmailConfirmationClose: () => CUSTOMER_ACCOUNT_PATH,
      inputsDefaultValueSet,
      addressesData,
    })(signUpForm);

    modal = await createModal([signUpForm]);
    modal.showModal();
  };

  orderConfirmationProvider.render(OrderConfirmation, {
    orderRef,
    orderData,
    onSignUpClick,
    routeHome: () => '/',
    routeSupport: () => '/support',
  })(block);
}

export default async function decorate(block) {
  /*
   * Render Containers
   */

  uiProvider.render(Divider, { variant: 'primary' })(headingDivider);
  uiProvider.render(ProgressSpinner)(overlaySpinner);
  cartProvider.render(EmptyCart, { routeCTA: () => '/' })(emptyCart);
  checkoutProvider.render(ErrorBanner)(errorBanner);
  checkoutProvider.render(MergedCartBanner)(mergedCartBanner);

  checkoutProvider.render(OutOfStock, {
    routeCart: () => '/cart',
    onCartProductsUpdate: (items) => {
      cartApi.updateProductsFromCart(items).catch(console.error);
    },
  })(outOfStock);

  checkoutProvider.render(LoginForm, {
    onSignInClick: async (initialEmailValue) => {
      const signInForm = document.createElement('div');

      authProvider.render(AuthCombine, {
        signInFormConfig: {
          renderSignUpLink: true,
          initialEmailValue,
          onSuccessCallback: () => {
            overlaySpinner.classList.add('checkout__overlay-spinner--shown');
          },
        },
        signUpFormConfig: {},
        resetPasswordFormConfig: {},
      })(signInForm);

      modal = await createModal([signInForm]);
      modal.showModal();
    },
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
  })(login);

  checkoutProvider.render(ShippingForm, { hideOnVirtualCart: true })(
    shippingForm,
  );
  checkoutProvider.render(BillToShippingAddress, { hideOnVirtualCart: true })(
    billToShippingAddress,
  );
  checkoutProvider.render(BillingForm)(billingForm);

  checkoutProvider.render(ShippingMethods, {
    hideOnVirtualCart: true,
    // onShippingMethodSelect: (shippingMethod) => {},
    onCheckoutDataUpdate: () => {
      cartApi.refreshCart().catch(console.error);
    },
  })(shippingMethods);

  checkoutProvider.render(PaymentMethods, {
    // slots: {
    //   Handlers: {
    //     checkmo: (_ctx) => {
    //       const $content = document.createElement('div');
    //       $content.innerText = 'checkmo';
    //       _ctx.replaceHTML($content);
    //     },
    //   },
    // },
  })(paymentMethods);

  cartProvider.render(OrderSummary, {
    slots: {
      EstimateShipping: (esCtx) => {
        const estimateShippingForm = document.createElement('div');

        checkoutProvider.render(EstimateShipping)(estimateShippingForm);

        esCtx.appendChild(estimateShippingForm);
      },
    },
  })(orderSummary);

  cartProvider.render(CartSummaryList, {
    slots: {
      Heading: (headingCtx) => {
        // TODO: Update this to use the dictionary
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
        editCartLink.href = '/cart';
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
    },
  })(cartSummaryList);

  checkoutProvider.render(PlaceOrder, {
    onPlaceOrder: async () => {
      overlaySpinner.classList.add('checkout__overlay-spinner--shown');

      try {
        await checkoutApi.placeOrder();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        overlaySpinner.classList.remove('checkout__overlay-spinner--shown');
      }
    },
  })(placeOrder);

  /*
   * Render initial layout and setup event handlers
   */

  mediaQuery.addEventListener('change', (e) => handleScreenResize(e, block));
  handleScreenResize(mediaQuery, block);

  events.on('authenticated', handleAuthenticated, { eager: true });
  events.on('checkout/data', (e) => handleCheckoutData(e, block), {
    eager: true,
  });
  events.on('checkout/customer', handleCheckoutCustomer, { eager: true });
  events.on('checkout/order', (e) => handleCheckoutOrder(e, block));
}
