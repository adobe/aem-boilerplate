import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-company-switcher/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/company-switcher.json').catch(() => ({}));

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize company switcher
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    fetchGraphQlModules: [CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL],
    groupGraphQlModules: [CS_FETCH_GRAPHQL],
  });
})();
