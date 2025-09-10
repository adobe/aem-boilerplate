import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-company-switcher/api.js';
import * as pdpFetchGraphQl from '@dropins/storefront-pdp/api.js';
import * as cartFetchGraphQl from '@dropins/storefront-cart/api.js';
import * as searchFetchGraphQl from '@dropins/storefront-product-discovery/api.js';
import * as orderFetchGraphQl from '@dropins/storefront-order/api.js';
import * as accountFetchGraphQl from '@dropins/storefront-account/api.js';
import * as companyFetchGraphQl from '@dropins/storefront-company-switcher/api.js';
import * as checkoutFetchGraphQl from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

const fetchGraphQlModules = [
  pdpFetchGraphQl,
  cartFetchGraphQl,
  searchFetchGraphQl,
  orderFetchGraphQl,
  accountFetchGraphQl,
  companyFetchGraphQl,
  checkoutFetchGraphQl,
];
const groupGraphQlModules = [
  pdpFetchGraphQl,
  searchFetchGraphQl,
];

await initializeDropin(async () => {
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('company-switcher') }));

  const labels = await fetchPlaceholders('placeholders/company-switcher.json').catch(() => ({}));
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    fetchGraphQlModules,
    groupGraphQlModules,
  });
})();
