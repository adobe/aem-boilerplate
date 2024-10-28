/* eslint-disable import/no-cycle */
import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-cart/api.js';
import { initializeDropin } from './index.js';

initializeDropin(async () => {
  await initializers.mountImmediately(initialize, {});
})();
