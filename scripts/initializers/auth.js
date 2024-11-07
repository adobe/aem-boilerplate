/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-auth/api.js';
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
