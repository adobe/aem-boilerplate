import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { loadScript } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/commerce.js';

(async () => {
  const widgetProd = '/scripts/widgets/SearchAsYouType.js';
  await loadScript(widgetProd);

  const storeDetails = {
    environmentId: getConfigValue('headers.cs.Magento-Environment-Id'),
    environmentType: (getConfigValue('commerce-endpoint')).includes('sandbox') ? 'testing' : '',
    apiKey: getConfigValue('headers.cs.x-api-key'),
    apiUrl: getConfigValue('commerce-endpoint'),
    websiteCode: getConfigValue('headers.cs.Magento-Website-Code'),
    storeCode: getConfigValue('headers.cs.Magento-Store-Code'),
    storeViewCode: getConfigValue('headers.cs.Magento-Store-View-Code'),
    config: {
      pageSize: 8,
      perPageConfig: {
        pageSizeOptions: '12,24,36',
        defaultPageSizeOption: '24',
      },
      minQueryLength: '2',
      currencySymbol: '$',
      currencyRate: '1',
      displayOutOfStock: true,
      allowAllProducts: false,
    },
    context: {
      customerGroup: getConfigValue('headers.cs.Magento-Customer-Group'),
    },
    route: ({ sku, urlKey }) => rootLink(`/products/${urlKey}/${sku}`),
    searchRoute: {
      route: rootLink('/search'),
      query: 'q',
    },
  };

  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.LiveSearchAutocomplete) {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });

  return new window.LiveSearchAutocomplete(storeDetails);
})();
