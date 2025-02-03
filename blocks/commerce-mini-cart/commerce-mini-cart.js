import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { localizeLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => localizeLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => localizeLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => localizeLink(checkoutURL) : undefined,
    routeProduct: (product) => localizeLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
  })(block);
}
