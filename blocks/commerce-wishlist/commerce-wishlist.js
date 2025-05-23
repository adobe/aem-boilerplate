/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import * as cartApi from '@dropins/storefront-cart/api.js';
import { render as wishlistRenderer } from '@dropins/storefront-wishlist/render.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { events } from '@dropins/tools/event-bus.js';
import Wishlist from '@dropins/storefront-wishlist/containers/Wishlist.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/wishlist.js';

import { readBlockConfig } from '../../scripts/aem.js';

const showAuthModal = (event) => {
  if (event) {
    event.preventDefault();
  }

  const signInModal = document.createElement('div');
  signInModal.setAttribute('id', 'signin-modal');

  const signInForm = document.createElement('div');
  signInForm.setAttribute('id', 'signin-form');

  signInModal.onclick = (clickEvent) => {
    if (clickEvent.target === signInModal) {
      signInModal.remove();
    }
  };

  signInModal.appendChild(signInForm);
  document.body.appendChild(signInModal);

  // Render auth form
  authRenderer.render(AuthCombine, {
    signInFormConfig: { renderSignUpLink: true },
    signUpFormConfig: {},
    resetPasswordFormConfig: {},
  })(signInForm);

  const authListener = events.on('authenticated', (authenticated) => {
    if (authenticated) {
      signInModal.remove();
      authListener.off();
    }
  });
};

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
  } = readBlockConfig(block);

  await wishlistRenderer.render(Wishlist, {
    routeEmptyWishlistCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    moveProdToCart: cartApi.addProductsToCart,
    onLoginClick: showAuthModal,
  })(block);
}
