/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';

// Cart Dropin Modules
import * as cartApi from '@dropins/storefront-cart/api.js';
import CartSummaryList from '@dropins/storefront-cart/containers/CartSummaryList.js';
import { OrderSummary } from '@dropins/storefront-cart/containers/OrderSummary.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

// Checkout Dropin Modules
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import Checkout from '@dropins/storefront-checkout/containers/Checkout.js';
import EstimateShipping from '@dropins/storefront-checkout/containers/EstimateShipping.js';
import { render as checkoutProvider } from '@dropins/storefront-checkout/render.js';

// Order Confirmation Dropin Modules
import * as orderConfirmationApi from '@dropins/storefront-order-confirmation/api.js';
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';
import { render as orderConfirmationProvider } from '@dropins/storefront-order-confirmation/render.js';

// Auth Dropin Modules
import * as authApi from '@dropins/storefront-auth/api.js';
import AuthCombine from '@dropins/storefront-auth/containers/AuthCombine.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';

import { getUserTokenCookie } from '../../scripts/dropins.js';
import { createModal } from '../modal/modal.js';

export default async function decorate(block) {
  let modal = null;

  // Initialize Dropins
  initializers.register(checkoutApi.initialize, {});

  events.on(
    'authenticated',
    (isAuthenticated) => {
      if (isAuthenticated && modal) {
        modal.removeModal();
        modal = null;
      }
    },
    { eager: true },
  );

  // Display order confirmation
  events.on('checkout/order', (orderData) => {
    const token = getUserTokenCookie();
    const orderRef = token ? orderData.number : orderData.token;
    const encodedOrderRef = encodeURIComponent(orderRef);

    window.history.pushState(
      {},
      '',
      `/order-confirmation?orderRef=${encodedOrderRef}`,
    );

    checkoutProvider.unmount(block);

    initializers.register(orderConfirmationApi.initialize, {});

    const onSignUpClick = async ({
      inputsDefaultValueSet,
      addressesData,
    }) => {
      const signUpForm = document.createElement('div');

      authProvider.render(SignUp, {
        routeSignIn: () => '/customer/login',
        routeRedirectOnEmailConfirmationClose: () => '/customer/account',
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
  });

  const onSignInClick = async (initialEmailValue) => {
    const signInForm = document.createElement('div');

    authProvider.render(AuthCombine, {
      signInFormConfig: { renderSignUpLink: true, initialEmailValue },
      signUpFormConfig: {},
      resetPasswordFormConfig: {},
    })(signInForm);

    modal = await createModal([signInForm]);
    modal.showModal();
  };

  return checkoutProvider.render(Checkout, {
    onSignInClick: async () => onSignInClick(),
    onSignOutClick: () => {
      authApi.revokeCustomerToken();
    },
    onCheckoutDataUpdate: () => {
      cartApi.refreshCart().catch(console.error);
    },
    routeHome: () => '/',
    routeCart: () => '/cart',
    slots: {
      OrderSummary: (ctx) => {
        const orderSummary = document.createElement('div');

        cartProvider.render(OrderSummary, {
          slots: {
            EstimateShipping: (esCtx) => {
              const estimateShippingForm = document.createElement('div');

              checkoutProvider.render(EstimateShipping)(
                estimateShippingForm,
              );

              esCtx.appendChild(estimateShippingForm);
            },
          },
        })(orderSummary);

        ctx.appendChild(orderSummary);
      },
      CartSummaryList: (checkoutCtx) => {
        const cartSummaryList = document.createElement('div');
        cartSummaryList.classList.add('cart-summary-list');

        cartProvider.render(CartSummaryList, {
          slots: {
            Heading: (headingCtx) => {
              const { dictionary } = checkoutCtx;
              const { title, editLink } = dictionary.Checkout.Slots.CartSummaryList
                .Heading;

              const cartSummaryListHeading = document.createElement('div');
              cartSummaryListHeading.classList.add(
                'cart-summary-list__heading',
              );

              const cartSummaryListHeadingText = document.createElement('div');
              cartSummaryListHeadingText.classList.add(
                'cart-summary-list__heading-text',
              );

              cartSummaryListHeadingText.innerText = title.replace('{count}', headingCtx.count);
              const editCartLink = document.createElement('a');
              editCartLink.classList.add(
                'cart-summary-list__edit',
              );
              editCartLink.href = '/cart';
              editCartLink.rel = 'noreferrer';
              editCartLink.innerText = editLink;

              cartSummaryListHeading.appendChild(
                cartSummaryListHeadingText,
              );
              cartSummaryListHeading.appendChild(editCartLink);
              headingCtx.appendChild(cartSummaryListHeading);

              headingCtx.onChange((nextHeadingCtx) => {
                cartSummaryListHeadingText.innerText = title.replace('{count}', nextHeadingCtx.count);
              });
            },
          },
        })(cartSummaryList);

        checkoutCtx.appendChild(cartSummaryList);
      },
      PaymentMethods: async (context) => {
        context.addPaymentMethodHandler('checkmo', {
          render: (ctx, element) => {
            if (element) {
              // clear the element first
              element.innerHTML = '';
            }

            // Optionally, create and render some custom content here.
            // const $content = document.createElement('div');
            // $content.innerText = 'Custom Check / Money order handler';
            // ctx.appendHTMLElement($content);
          },
        });
      },
    },
  })(block);
}
