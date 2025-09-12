import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setFetchGraphQlHeaders,
  getFetchGraphQlHeader,
  setEndpoint,
} from '@dropins/storefront-product-discovery/api.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders, commerceEndpointWithQueryParams } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch Headers (Service)
  const customerGroupHeaderValue = getFetchGraphQlHeader('Magento-Customer-Group');
  const customerGroupHeader = customerGroupHeaderValue ? {
    'Magento-Customer-Group': customerGroupHeaderValue,
  } : {};
  setEndpoint(await commerceEndpointWithQueryParams(customerGroupHeader));
  setFetchGraphQlHeaders((prev) => ({
    ...prev,
    ...getHeaders('cs'),
    ...customerGroupHeader,
  }));

  const labels = await fetchPlaceholders('placeholders/search.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
