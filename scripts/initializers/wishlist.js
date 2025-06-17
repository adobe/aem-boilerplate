import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-wishlist/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders(await getHeaders('wishlist'));

  const labels = await fetchPlaceholders('placeholders/wishlist.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    isGuestWishlistEnabled: true,
  });
})();
