import { readBlockConfig } from '../../scripts/aem.js';
import { getConfigValue } from '../../scripts/configs.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // eslint-disable-next-line import/no-absolute-path, import/no-unresolved
  await import('/scripts/widgets/search.js');

  const { category, urlpath, type } = readBlockConfig(block);
  block.textContent = '';

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
        defaultPageSizeOption: '12',
      },
      minQueryLength: '2',
      currencySymbol: '$',
      currencyRate: '1',
      displayOutOfStock: true,
      allowAllProducts: false,
      imageCarousel: false,
      optimizeImages: true,
      imageBaseWidth: 200,
      listview: true,
      displayMode: '', // "" for plp || "PAGE" for category/catalog
      addToCart: async (...args) => {
        const { addProductsToCart } = await import('../../scripts/__dropins__/storefront-cart/api.js');
        await addProductsToCart([{
          sku: args[0],
          options: args[1],
          quantity: args[2],
        }]);
      },
    },
    context: {
      customerGroup: await getConfigValue('commerce.headers.cs.Magento-Customer-Group'),
    },
    route: ({ sku, urlKey }) => {
      const a = new URL(window.location.origin);
      a.pathname = rootLink(`/products/${urlKey}/${sku}`);
      return a.toString();
    },
  };

  if (type !== 'search') {
    storeDetails.config.categoryName = document.querySelector('.default-content-wrapper > h1')?.innerText;
    storeDetails.config.currentCategoryId = category;
    storeDetails.config.currentCategoryUrlPath = urlpath;

    // Enable enrichment
    block.dataset.category = category;
  }

  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.LiveSearchPLP) {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });

  return window.LiveSearchPLP({ storeDetails, root: block });
}
