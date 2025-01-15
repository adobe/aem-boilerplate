import XLSX from 'xlsx';
import fs from 'fs';
import he from 'he';
import productSearchQuery from './queries/products.graphql.js';
import { variantsFragment } from './queries/variants.graphql.js';
import { commerceEndpointWithQueryParams } from "../../scripts/commerce.js";

const basePath = 'https://www.aemshop.net';
const configFile = `${basePath}/configs.json?sheet=prod`;

async function performCatalogServiceQuery(config, query, variables) {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config['commerce.headers.cs.x-api-key'],
    'Magento-Customer-Group': config['commerce.headers.cs.Magento-Customer-Group'],
    'Magento-Environment-Id': config['commerce.headers.cs.Magento-Environment-Id'],
    'Magento-Store-Code': config['commerce.headers.cs.Magento-Store-Code'],
    'Magento-Store-View-Code': config['commerce.headers.cs.Magento-Store-View-Code'],
    'Magento-Website-Code': config['commerce.headers.cs.Magento-Website-Code'],
  };

  const apiCall = await commerceEndpointWithQueryParams();

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
          path: `/products/${urlKey}/${sku}`,
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
  const config = {};
  try {
    const resp = await fetch(configFile).then((res) => res.json());
    resp.data.forEach((item) => {
      config[item.key] = item.value;
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const products = await getProducts(config, 1);

  const data = [
    [
      'URL',
      'title',
      'description',
      'keywords',
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
})();
