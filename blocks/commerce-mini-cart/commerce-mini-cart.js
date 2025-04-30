import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';
import { initializeCart } from '@dropins/storefront-cart/api.js';
import { events } from '@dropins/tools/event-bus.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = '';

  try {
    const config = readBlockConfig(block);

    const startShoppingURL = config['start-shopping-url'] || '/';
    const cartURL = config['cart-url'] || '/cart';
    const checkoutURL = config['checkout-url'] || '/checkout';

    const routes = {
      routeEmptyCartCTA: () => rootLink(startShoppingURL),
      routeCart: () => rootLink(cartURL),
      routeCheckout: () => rootLink(checkoutURL),
      routeProduct: (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`),
      isOpen: false,
    };

    const cart = await initializeCart();
    await provider.render(MiniCart, routes)(block);

    if (cart) {
      events.emit('cart/data', cart);
      events.emit('cart/initialized', cart);
    }

    events.on('cart/updated', (cartData) => cartData && events.emit('cart/data', cartData), { eager: true });

  } catch (error) {
    console.error('Error initializing cart:', error);
    events.emit('cart/data', null);
  }
}
