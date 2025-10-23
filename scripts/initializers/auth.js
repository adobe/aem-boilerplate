import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-auth/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('auth') }));

  const labels = await fetchPlaceholders('placeholders/auth.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Default customer group ID for unauthenticated users
  const DEFAULT_CUSTOMER_GROUP_ID = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    customerGroup: {
      defaultCustomerGroupId: DEFAULT_CUSTOMER_GROUP_ID,
    },
  });
})();
