import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { initialize, setEndpoint } from '@dropins/storefront-auth/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

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
  const customerPermissionRoles = getConfigValue('commerce-b2b-enabled') === true;
  return initializers.mountImmediately(initialize, { langDefinitions, customerPermissionRoles });
})();
