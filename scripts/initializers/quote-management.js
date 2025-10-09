/* eslint-disable import/no-cycle */
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-quote-management/api.js';
import { initializers } from '@dropins/tools/initializer.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { fetchPlaceholders } from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders(await getHeaders('quote-management'));

  const labels = await fetchPlaceholders();

  const url = new URL(window.location.href);
  const quoteId = url.searchParams.get('quoteId');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    quoteId,
  });
})();
