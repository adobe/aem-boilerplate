/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import * as cartApi from '@dropins/storefront-cart/api.js';
import { render as wishlistRenderer } from '@dropins/storefront-wishlist/render.js';
import Wishlist from '@dropins/storefront-wishlist/containers/Wishlist.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_WISHLIST_PATH } from '../../scripts/constants.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/wishlist.js';

import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
  } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_WISHLIST_PATH);
  } else {
    await wishlistRenderer.render(Wishlist, {
      routeEmptyWishlistCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
      moveProdToCart: cartApi.addProductsToCart,
    })(block);
  }
}
