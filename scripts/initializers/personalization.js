import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-personalization/api.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => initializers.mountImmediately(initialize, {}))();
