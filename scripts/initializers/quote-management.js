import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-quote-management/api.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/quote-management.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Get quote ID from URL
  const url = new URL(window.location.href);
  const quoteId = url.searchParams.get('quoteid') || url.searchParams.get('quoteId');

  // Initialize quote management
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    quoteId,
  });
})();
