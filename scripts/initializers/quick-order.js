import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-quick-order/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL for Quick Order (Core Service)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/quick-order.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize Quick Order
  return initializers.mountImmediately(initialize, { langDefinitions });
})();
