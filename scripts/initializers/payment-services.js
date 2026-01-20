import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue, getHeaders } from '@dropins/tools/lib/aem/configs.js';
import * as paymentServicesApi from '@dropins/storefront-payment-services/api.js';
import { initializeDropin, getUserTokenCookie } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  const headers = getHeaders('payment-services');
  const labels = await fetchPlaceholders('placeholders/payment-services.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(paymentServicesApi.initialize, {
    apiUrl: getConfigValue('commerce-core-endpoint') || await getConfigValue('commerce-endpoint'),
    getCustomerToken: getUserTokenCookie,
    storeViewCode: headers.Store,
    langDefinitions,
  });
})();
