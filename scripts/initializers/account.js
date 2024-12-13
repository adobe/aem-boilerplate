import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-account/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
