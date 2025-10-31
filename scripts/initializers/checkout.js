import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-checkout/api.js';
import {
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
  detectPageType,
} from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  const pageType = detectPageType();

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/checkout.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize checkout
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
