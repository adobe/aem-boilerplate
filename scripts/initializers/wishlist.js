import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-wishlist/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Catalog Service)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/wishlist.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize wishlist
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    isGuestWishlistEnabled: true,
  });
})();
