import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint, setFetchGraphQlHeaders } from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import { getProduct, getSkuFromUrl } from '../commerce.js';
import { getConfigValue } from '../configs.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  // Set Fetch Endpoint (Service)
  setEndpoint(await getConfigValue('commerce-endpoint'));

  // Set Fetch Headers (Service)
  setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  const sku = getSkuFromUrl();
  window.getProductPromise = getProduct(sku);

  const [product, labels] = await Promise.all([
    window.getProductPromise,
    fetchPlaceholders(),
  ]);

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    models,
  });
})();
