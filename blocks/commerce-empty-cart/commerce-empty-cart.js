import { render as provider } from '@dropins/storefront-cart/render.js';
import EmptyCart from '@dropins/storefront-cart/containers/EmptyCart.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(EmptyCart, {
    routeCTA: startShoppingURL ? () => startShoppingURL : undefined,
  })(block);
}
