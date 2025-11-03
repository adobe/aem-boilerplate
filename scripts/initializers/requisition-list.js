import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-requisition-list/api.js';
import { initializeDropin } from './index.js';
import { CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/requisition-list.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize requisition list
  return initializers.mountImmediately(initialize, { langDefinitions });
})();
