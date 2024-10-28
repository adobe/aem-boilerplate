import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';

initializeDropin(async () => {
  await initializers.mountImmediately(initialize, {});
})();
