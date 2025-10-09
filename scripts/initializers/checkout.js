import {
  initialize,
  setFetchGraphQlHeaders,
} from '@dropins/storefront-checkout/api.js';
import { initializers } from '@dropins/tools/initializer.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { fetchPlaceholders, rootLink, detectPageType } from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('checkout') }));

  const pageType = detectPageType();

  const labels = await fetchPlaceholders('placeholders/checkout.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    features: {
      b2b: {
        quotes: pageType === 'B2B Checkout',
        routeLogin: () => rootLink('/customer/login'),
      },
    },
    langDefinitions,
  });
})();
