import { generateAemAssetsOptimizedUrl, isAemAssetsEnabled } from '@dropins/tools/lib/aem/assets.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  await import('../../scripts/widgets/search.js');

  const { category, urlpath, type } = readBlockConfig(block);
  block.textContent = '';

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
        defaultPageSizeOption: '12',
      },
      minQueryLength: '2',
      currencySymbol: '$',
      currencyRate: '1',
      displayOutOfStock: true,
      allowAllProducts: false,
      imageCarousel: false,
      optimizeImages: true,
      overrideImageProps: (original, product) => {
        if (isAemAssetsEnabled()) {
          const optimized = generateAemAssetsOptimizedUrl(original, product.sku, {
            width: 200,
          });

          return {
            src: optimized,
            params: {
              auto: null,
              fit: null,
              cover: null,
              crop: null,
              dpi: null,
            },
          };
        }

        return { src: original };
      },
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
      customerGroup: getConfigValue('headers.cs.Magento-Customer-Group'),
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
