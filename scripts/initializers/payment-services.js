import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-payment-services/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/payment-services.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize payment services
  return initializers.mountImmediately(initialize, {
    langDefinitions,
  });
})();
