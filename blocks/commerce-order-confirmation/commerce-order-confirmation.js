/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';

// Order Confirmation Dropin Modules
import * as orderConfirmationApi from '@dropins/storefront-order-confirmation/api.js';
import { render as provider } from '@dropins/storefront-order-confirmation/render.js';
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';

// Auth Dropin Modules
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';

import { createModal } from '../modal/modal.js';

export default async function decorate(block) {
  let modal = null;

  // Initialize Dropins
  initializers.register(orderConfirmationApi.initialize, {});

  events.on('authenticated', (isAuthenticated) => {
    if (isAuthenticated && modal) {
      modal.removeModal();
      modal = null;
    }
  });

  const onSignUpClick = async ({ inputsDefaultValueSet, addressesData }) => {
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

  const params = new URLSearchParams(window.location.search);
  const orderRef = params.get('orderRef');

  return provider.render(OrderConfirmation, {
    orderRef,
    onSignUpClick,
    routeHome: () => '/',
    routeSupport: () => '/support',
  })(block);
}
