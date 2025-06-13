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

  // for local testing
  // setEndpoint("https://catalog-service.adobe.io/graphql");
  // setFetchGraphQlHeaders({
  //   "Magento-Customer-Group": "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",
  //   "Magento-Environment-Id": "632a5274-20e8-4e54-b13e-d6cb0602819c",
  //   "Magento-Store-Code": "main_website_store",
  //   "Magento-Store-View-Code": "default",
  //   "Magento-Website-Code": "base",
  //   "X-API-Key": "c7f955aaacff45bea9be712ea777a26c",
  // });

  const labels = await fetchPlaceholders();
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
