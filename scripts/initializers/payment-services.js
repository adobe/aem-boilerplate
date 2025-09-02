import { initializers } from '@dropins/tools/initializer.js';
import * as paymentServicesApi from '@dropins/storefront-payment-services/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  const labels = await fetchPlaceholders('placeholders/payment-services.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(paymentServicesApi.initialize, {
    langDefinitions,
  });
})();
