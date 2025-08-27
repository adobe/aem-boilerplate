import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '../__dropins__/storefront-company-management/api.js';
import { fetchPlaceholders } from '../commerce.js';

await (async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('company') }));

  let langDefinitions;
  try {
    const labels = await fetchPlaceholders('placeholders/company.json');
    langDefinitions = { default: { ...labels } };
  } catch {
    langDefinitions = undefined;
  }

  return initializers.mountImmediately(initialize, { langDefinitions });
})();
