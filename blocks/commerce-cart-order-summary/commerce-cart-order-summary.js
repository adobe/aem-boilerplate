import { render as provider } from '@dropins/storefront-cart/render.js';
import OrderSummary from '@dropins/storefront-cart/containers/OrderSummary.js';
import EstimateShipping from '@dropins/storefront-cart/containers/EstimateShipping.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'checkout-url': checkoutURL = '',
    'enable-estimate-shipping': enableEstimateShipping = 'false',
  } = readBlockConfig(block);

  block.innerHTML = '';

  return provider.render(OrderSummary, {
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    routeCheckout: checkoutURL ? () => checkoutURL : undefined,
    slots: {
      EstimateShipping: async (ctx) => {
        if (enableEstimateShipping === 'true') {
          const wrapper = document.createElement('div');
          await provider.render(EstimateShipping, {})(wrapper);
          ctx.replaceWith(wrapper);
        }
      },
    },
  })(block);
}
