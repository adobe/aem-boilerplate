/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setFetchGraphQlHeaders,
  setEndpoint,
} from '@dropins/storefront-product-discovery/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders, commerceEndpointWithQueryParams } from '../commerce.js';

await initializeDropin(async () => {
  setEndpoint(await commerceEndpointWithQueryParams());
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
