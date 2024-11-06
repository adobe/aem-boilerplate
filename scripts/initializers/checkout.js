import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';

initializeDropin(async () => {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  await initializers.mountImmediately(initialize, { langDefinitions });
})();
