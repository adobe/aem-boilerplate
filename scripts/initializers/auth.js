import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-auth/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

// Default customer group ID for unauthenticated users
const DEFAULT_CUSTOMER_GROUP_ID = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/auth.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize auth
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    customerGroup: {
      defaultCustomerGroupId: DEFAULT_CUSTOMER_GROUP_ID,
    },
  });
})();
