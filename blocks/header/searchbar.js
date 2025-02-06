import { loadScript } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';
import { getConfigValue } from '../../scripts/configs.js';

(async () => {
  const widgetProd = '/scripts/widgets/SearchAsYouType.js';
  await loadScript(widgetProd);

  const storeDetails = {
    environmentId: await getConfigValue('commerce.headers.cs.Magento-Environment-Id'),
    environmentType: (await getConfigValue('commerce-endpoint')).includes('sandbox') ? 'testing' : '',
    apiKey: await getConfigValue('commerce.headers.cs.x-api-key'),
    apiUrl: await getConfigValue('commerce-endpoint'),
    websiteCode: await getConfigValue('commerce.headers.cs.Magento-Website-Code'),
    storeCode: await getConfigValue('commerce.headers.cs.Magento-Store-Code'),
    storeViewCode: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
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
      customerGroup: await getConfigValue('commerce.headers.cs.Magento-Customer-Group'),
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

  // eslint-disable-next-line no-new
  new window.LiveSearchAutocomplete(storeDetails);
})();
