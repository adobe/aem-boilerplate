import XLSX from 'xlsx';
import fs from 'fs';
import he from 'he';
import productSearchQuery from './queries/products.graphql.js';

const basePath = 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live';
const configFile = `${basePath}/configs.json?sheet=prod`;


async function performCatalogServiceQuery(config, query, variables) {
  const headers = {
    'Content-Type': 'application/json',
    'Magento-Environment-Id': config['commerce-environment-id'],
    'Magento-Website-Code': config['commerce-website-code'],
    'Magento-Store-View-Code': config['commerce-store-view-code'],
    'Magento-Store-Code': config['commerce-store-code'],
    'Magento-Customer-Group': config['commerce-customer-group'],
    'x-api-key': config['commerce-x-api-key'],
  };

  const apiCall = new URL(config['commerce-endpoint']);
  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ')
    .replace(/\s\s+/g, ' '));
  apiCall.searchParams.append('variables', variables ? JSON.stringify(variables) : null);

  const response = await fetch(apiCall, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    return null;
  }

  const queryResponse = await response.json();

  return queryResponse.data;
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
      } = item.productView;
      const { url: imageUrl } = item.product.image ?? {};

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
        },
      };
    }));
    const totalPages = response.productSearch.page_info.total_pages;
    const currentPage = response.productSearch.page_info.current_page;
    console.log(`Retrieved page ${currentPage} of ${totalPages} pages`);
    if (currentPage !== totalPages) {
      return [...products, ...(await getProducts(config, currentPage + 1))];
    }
    return products;
  }
  return [];
};

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
    ],
  ];
  products.forEach(({ productView: metaData }) => {
    data.push(
      [
        metaData.path, // URL
        metaData.meta_title, // title
        metaData.meta_description, // description
        metaData.meta_keyword, // keywords
        'og:product', // og:type
        metaData.meta_title, // og:title
        metaData.meta_description, // og:description
        `${basePath}${metaData.path}`, // og:url
        metaData['og:image'], // og:image
        metaData['og:image:secure_url'], // og:image:secure_url
      ],
    );
  });

  // Write XLSX file
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = { Sheets: { Sheet1: worksheet }, SheetNames: ['Sheet1'] };
  const xlsx = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  await fs.promises.writeFile('metadata.xlsx', xlsx);
})();
