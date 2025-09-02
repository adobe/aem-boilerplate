import XLSX from 'xlsx';
import fs from 'fs';
import he from 'he';
import productSearchQuery from './queries/products.graphql.js';
import { variantsFragment } from './queries/variants.graphql.js';
const basePath = 'https://www.aemshop.net';
const configFile = `${basePath}/config.json`;

/**
 * Performs a deep merge of objects
 * @param {Object} target - The target object to merge into
 * @param {Object} source - The source object to merge from
 * @returns {Object} The merged object
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Merges a store configuration with the default configuration
 * @param {Object} defaultConfig - The default configuration object
 * @param {Object} storeConfig - The store-specific configuration object
 * @returns {Object} Merged configuration object
 */
function mergeStoreConfig(defaultConfig, storeConfig) {
  const mergedConfig = { ...defaultConfig };

  // Deep merge the entire headers object if defined
  if (storeConfig.headers) {
    mergedConfig.headers = deepMerge(mergedConfig.headers || {}, storeConfig.headers);
  }

  // Override commerce-endpoint if defined
  if (storeConfig['commerce-endpoint']) {
    mergedConfig['commerce-endpoint'] = storeConfig['commerce-endpoint'];
  }

  return mergedConfig;
}

export async function commerceEndpointWithQueryParams(config) {
  const urlWithQueryParams = new URL(config['commerce-endpoint']);
  // Set some query parameters for use as a cache-buster. No other purpose.
  const hash = createHashFromObject(config.headers?.cs ?? {});
  urlWithQueryParams.searchParams.append('cb', hash);
  return urlWithQueryParams;
}

async function performCatalogServiceQuery(config, query, variables) {
  const headers = {
    'Content-Type': 'application/json',
    ...config.headers?.all,
    ...config.headers?.cs,
  };

  const apiCall = await commerceEndpointWithQueryParams(config);

  const response = await fetch(apiCall, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ').replace(/\s\s+/g, ' '),
      variables,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const queryResponse = await response.json();

  return queryResponse.data;
}

/**
 * Creates a short hash from an object by sorting its entries and hashing them.
 * @param {Object} obj - The object to hash
 * @param {number} [length=5] - Length of the resulting hash
 * @returns {string} A short hash string
 */
function createHashFromObject(obj, length = 5) {
  // Sort entries by key and create a string of key-value pairs
  const objString = Object.entries(obj)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');

  // Create a short hash using a simple string manipulation
  return objString
    .split('')
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 2147483647, 0)
    .toString(36)
    .slice(0, length);
}

function getJsonLd(product, { variants }) {
  const amount = product.priceRange?.minimum?.final?.amount || product.price?.final?.amount;
  const brand = product.attributes.find((attr) => attr.name === 'brand');

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.meta_description,
    image: product['og:image'],
    offers: [],
    productID: product.sku,
    sku: product.sku,
    url: product.path,
    '@id': product.path,
  };

  if (brand?.value) {
    product.brand = {
      '@type': 'Brand',
      name: brand?.value,
    };
  }

  if (variants.length <= 1) {
    // simple products
    if (amount?.value && amount?.currency) {
      schema.offers.push({
        '@type': 'Offer',
        price: amount?.value,
        priceCurrency: amount?.currency,
        availability: product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
      });
    }
  } else {
    // complex products
    variants.forEach((variant) => {
      schema.offers.push({
        '@type': 'Offer',
        name: variant.product.name,
        image: variant.product.images[0]?.url,
        price: variant.product.price.final.amount.value,
        priceCurrency: variant.product.price.final.amount.currency,
        availability: variant.product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
        sku: variant.product.sku
      });
    })
  }

  return JSON.stringify(schema);
}

/**
 * Get products by page number
 * @param {INT} pageNumber - pass the pagenumber to retrieved paginated results
 */
const getProducts = async (config, pageNumber) => {
  const response = await performCatalogServiceQuery(
    config,
    productSearchQuery,
    { currentPage: pageNumber },
  );

  if (response && response.productSearch) {
    const products = await Promise.all(response.productSearch.items.map(async (item) => {
      const {
        urlKey,
        sku,
        metaDescription,
        name,
        metaKeyword,
        metaTitle,
        description,
        shortDescription,
        lastModifiedAt,
      } = item.productView;
      const { url: imageUrl } = item.productView.images?.[0] ?? { url: '' };

      let baseImageUrl = imageUrl;
      if (baseImageUrl.startsWith('//')) {
        baseImageUrl = `https:${baseImageUrl}`;
      }

      let finalDescription = '';
      if (metaDescription) {
        finalDescription = metaDescription;
      } else if (shortDescription) {
        finalDescription = shortDescription;
      } else if (description) {
        finalDescription = description;
      }
      finalDescription = he.decode(finalDescription.replace(/(<([^>]+)>)/ig, '')).trim();
      if (finalDescription.length > 200) {
        finalDescription = `${finalDescription.substring(0, 197)}...`;
      }

      return {
        productView: {
          ...item.productView,
          image: baseImageUrl,
          path: `products/${urlKey}/${sku}`.toLowerCase(),
          meta_keyword: (metaKeyword !== null) ? metaKeyword : '',
          meta_title: he.decode((metaTitle !== '') ? metaTitle : name),
          meta_description: finalDescription,
          'og:image': baseImageUrl,
          'og:image:secure_url': baseImageUrl,
          'last-modified': lastModifiedAt,
        },
      };
    }));
    const totalPages = response.productSearch.page_info.total_pages;
    const currentPage = response.productSearch.page_info.current_page;
    console.log(`Retrieved page ${currentPage} of ${totalPages} pages`);

    await addVariantsToProducts(products, config);

    if (currentPage !== totalPages) {
      return [...products, ...(await getProducts(config, currentPage + 1))];
    }
    return products;
  }
  return [];
};

async function addVariantsToProducts(products, config) {
  const query = `
  query Q {
      ${products.map((product, i) => {
        return `
        item_${i}: variants(sku: "${product.productView.sku}") {
          ...ProductVariant
        }
        `
      }).join('\n')}
    }${variantsFragment}`;

  const response = await performCatalogServiceQuery(config, query, null);

  if (!response) {
    throw new Error('Could not fetch variants');
  }

  products.forEach((product, i) => {
    product.variants = response[`item_${i}`];
  });
}

(async () => {
  const configResponse = await fetch(configFile)
    .then((res) => res.json())
    .then((data) => data.public)
    .catch((err) => {
      console.error(err);
      return {};
    });

  const defaultConfig = configResponse.default;
  if (!defaultConfig) {
    console.error('No default configuration found');
    return;
  }

  // Get all store configurations (excluding 'default')
  const storeConfigs = Object.entries(configResponse)
    .filter(([key]) => key !== 'default')
    .map(([rootPath, storeConfig]) => ({
      rootPath,
      config: mergeStoreConfig(defaultConfig, storeConfig)
    }));

  // Add default store to the list
  const allStores = [
    { rootPath: 'default', config: defaultConfig },
    ...storeConfigs
  ];

  console.log(`Processing ${allStores.length} stores: ${allStores.map(s => s.rootPath).join(', ')}`);

  // Process all stores and collect products
  const allProducts = [];
  for (const store of allStores) {
    console.log(`Processing store: ${store.rootPath}`);
    try {
      const storeProducts = await getProducts(store.config, 1);
      storeProducts.forEach(product => {
        // Ensure path includes the store "root"
        product.productView.path = store.rootPath === 'default' ? `/${product.productView.path}` : `${store.rootPath}${product.productView.path}`;
      });
      allProducts.push(...storeProducts);
      console.log(`Retrieved ${storeProducts.length} products from store: ${store.rootPath}`);
    } catch (error) {
      console.error(`Error processing store ${store.rootPath}:`, error);
    }
  }

  const products = allProducts;

  const data = [
    [
      'URL',
      'title',
      'description',
      'keywords',
      'sku',
      'og:type',
      'og:title',
      'og:description',
      'og:url',
      'og:image',
      'og:image:secure_url',
      'last-modified',
      'json-ld',
    ],
  ];
  products.forEach(({ productView: metaData, variants }) => {
    data.push(
      [
        metaData.path, // URL
        metaData.meta_title, // title
        metaData.meta_description, // description
        metaData.meta_keyword, // keywords
        metaData.sku, //sku
        'product', // og:type
        metaData.meta_title, // og:title
        metaData.meta_description, // og:description
        `${basePath}${metaData.path}`, // og:url
        metaData['og:image'], // og:image
        metaData['og:image:secure_url'], // og:image:secure_url
        metaData['last-modified'], // last-modified header
        getJsonLd(metaData, variants), // json-ld
      ],
    );
  });

  // Write XLSX file
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = { Sheets: { Sheet1: worksheet }, SheetNames: ['Sheet1'] };
  const xlsx = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  await fs.promises.writeFile('metadata.xlsx', xlsx);

  // Generate JSON data in the expected format
  const jsonData = {
    data: {
      total: products.length,
      limit: products.length,
      offset: 0,
      data: products.map(({ productView: metaData, variants }) => ({
        URL: metaData.path,
        title: metaData.meta_title,
        description: metaData.meta_description,
        keywords: metaData.meta_keyword,
        sku: metaData.sku,
        'og:type': 'product',
        'og:title': metaData.meta_title,
        'og:description': metaData.meta_description,
        'og:url': `${basePath}${metaData.path}`,
        'og:image': metaData['og:image'],
        'og:image:secure_url': metaData['og:image:secure_url'],
        'last-modified': metaData['last-modified'],
        'json-ld': getJsonLd(metaData, variants)
      })),
      ':colWidths': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    },
    ':names': ['data'],
    ':version': 3,
    ':type': 'multi-sheet',
  };

  // Write JSON file
  await fs.promises.writeFile('metadata.json', JSON.stringify(jsonData, null, 2));
  console.log(`Generated metadata.xlsx and metadata.json with ${products.length} products`);
})();
