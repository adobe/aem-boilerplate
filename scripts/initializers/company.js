import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-company-management/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('company') }));

  const labels = await fetchPlaceholders('placeholders/company.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
});
