import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-quote-management/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev }));

  const labels = await fetchPlaceholders('placeholders/cart.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
