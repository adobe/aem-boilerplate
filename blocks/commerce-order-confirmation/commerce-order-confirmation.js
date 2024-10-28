/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Tools
import { events } from '@dropins/tools/event-bus.js';

// Order Confirmation Dropin Modules
import { render as provider } from '@dropins/storefront-order-confirmation/render.js';
import OrderConfirmation from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';

// Auth Dropin Modules
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';

import { createModal } from '../modal/modal.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_LOGIN_PATH, SUPPORT_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';
import '../../scripts/initializers/order-confirmation.js';

export default async function decorate(block) {
  let modal = null;

  // Initialize Dropins
  events.on('authenticated', (isAuthenticated) => {
    if (isAuthenticated && modal) {
      modal.removeModal();
      modal = null;
    }
  });

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

  const params = new URLSearchParams(window.location.search);
  const orderRef = params.get('orderRef');

  return provider.render(OrderConfirmation, {
    orderRef,
    onSignUpClick,
    routeHome: () => '/',
    routeSupport: () => SUPPORT_PATH,
  })(block);
}
