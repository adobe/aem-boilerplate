import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-personalization/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Catalog Service)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Initialize personalization
  return initializers.mountImmediately(initialize, {});
})();
