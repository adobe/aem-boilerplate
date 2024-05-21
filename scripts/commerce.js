/* eslint-disable import/prefer-default-export, import/no-cycle */
import { getConfigValue } from './configs.js';
import { getConsent } from './scripts.js';

/* Common query fragments */
export const priceFieldsFragment = `fragment priceFields on ProductViewPrice {
  regular {
      amount {
          currency
          value
      }
  }
  final {
      amount {
          currency
          value
      }
  }
}`;

/* Queries PDP */
export const refineProductQuery = `query RefineProductQuery($sku: String!, $variantIds: [String!]!) {
  refineProduct(
    sku: $sku,
    optionIds: $variantIds
  ) {
    images(roles: []) {
      url
      roles
      label
    }
    ... on SimpleProductView {
      price {
        final {
          amount {
            currency
            value
          }
        }
        regular {
          amount {
            currency
            value
          }
        }
      }
    }
    addToCartAllowed
  }
}`;

export const productDetailQuery = `query ProductQuery($sku: String!) {
  products(skus: [$sku]) {
    __typename
    externalId
    sku
    name
    description
    shortDescription
    urlKey
    inStock
    images(roles: []) {
      url
      label
      roles
    }
    attributes(roles: []) {
      name
      label
      value
      roles
    }
    ... on SimpleProductView {
      price {
        ...priceFields
      }
    }
    ... on ComplexProductView {
      options {
        id
        title
        required
        values {
          id
          title
          inStock
          ...on ProductViewOptionValueSwatch {
            type
            value
          }
        }
      }
      priceRange {
        maximum {
          ...priceFields
        }
        minimum {
          ...priceFields
        }
      }
    }
  }
}
${priceFieldsFragment}`;

/* Common functionality */

export async function performCatalogServiceQuery(query, variables) {
  const headers = {
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  };

  const apiCall = new URL(await getConfigValue('commerce-endpoint'));
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

export function getSignInToken() {
  // TODO: Implement in project
  return '';
}

export async function performMonolithGraphQLQuery(query, variables, GET = true, USE_TOKEN = false) {
  const GRAPHQL_ENDPOINT = await getConfigValue('commerce-core-endpoint');

  const headers = {
    'Content-Type': 'application/json',
    Store: await getConfigValue('commerce-store-view-code'),
  };

  if (USE_TOKEN) {
    if (typeof USE_TOKEN === 'string') {
      headers.Authorization = `Bearer ${USE_TOKEN}`;
    } else {
      const token = getSignInToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  }

  let response;
  if (!GET) {
    response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ').replace(/\s\s+/g, ' '),
        variables,
      }),
    });
  } else {
    const endpoint = new URL(GRAPHQL_ENDPOINT);
    endpoint.searchParams.set('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ').replace(/\s\s+/g, ' '));
    endpoint.searchParams.set('variables', JSON.stringify(variables));
    response = await fetch(
      endpoint.toString(),
      { headers },
    );
  }

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export function renderPrice(product, format, html = (strings, ...values) => strings.reduce((result, string, i) => result + string + (values[i] || ''), ''), Fragment = null) {
  // Simple product
  if (product.price) {
    const { regular, final } = product.price;
    if (regular.amount.value === final.amount.value) {
      return html`<span class="price-final">${format(final.amount.value)}</span>`;
    }
    return html`<${Fragment}>
      <span class="price-regular">${format(regular.amount.value)}</span> <span class="price-final">${format(final.amount.value)}</span>
    </${Fragment}>`;
  }

  // Complex product
  if (product.priceRange) {
    const { regular: regularMin, final: finalMin } = product.priceRange.minimum;
    const { final: finalMax } = product.priceRange.maximum;

    if (finalMin.amount.value !== finalMax.amount.value) {
      return html`
      <div class="price-range">
        ${finalMin.amount.value !== regularMin.amount.value ? html`<span class="price-regular">${format(regularMin.amount.value)}</span>` : ''}
        <span class="price-from">${format(finalMin.amount.value)} - ${format(finalMax.amount.value)}</span>
      </div>`;
    }

    if (finalMin.amount.value !== regularMin.amount.value) {
      return html`<${Fragment}>
      <span class="price-final">${format(finalMin.amount.value)} - ${format(regularMin.amount.value)}</span> 
    </${Fragment}>`;
    }

    return html`<span class="price-final">${format(finalMin.amount.value)}</span>`;
  }

  return null;
}

/* PDP specific functionality */

export function getSkuFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/products\/[\w|-]+\/([\w|-]+)$/);
  return result?.[1];
}

const productsCache = {};
export async function getProduct(sku) {
  // eslint-disable-next-line no-param-reassign
  sku = sku.toUpperCase();
  if (productsCache[sku]) {
    return productsCache[sku];
  }
  const rawProductPromise = performCatalogServiceQuery(productDetailQuery, { sku });
  const productPromise = rawProductPromise.then((productData) => {
    if (!productData?.products?.[0]) {
      return null;
    }

    return productData?.products?.[0];
  });

  productsCache[sku] = productPromise;
  return productPromise;
}

// Store product view history in session storage
if (getConsent('commerce-recommendations')) {
  (async () => {
    const storeViewCode = await getConfigValue('commerce-store-view-code');
    window.adobeDataLayer.push((dl) => {
      dl.addEventListener('adobeDataLayer:change', (event) => {
        const key = `${storeViewCode}:productViewHistory`;
        let viewHistory = JSON.parse(window.localStorage.getItem(key) || '[]');
        viewHistory = viewHistory.filter((item) => item.sku !== event.productContext.sku);
        viewHistory.push({ date: new Date().toISOString(), sku: event.productContext.sku });
        window.localStorage.setItem(key, JSON.stringify(viewHistory.slice(-10)));
      }, { path: 'productContext' });
      dl.addEventListener('place-order', () => {
        const shoppingCartContext = dl.getState('shoppingCartContext');
        if (!shoppingCartContext) {
          return;
        }
        const key = `${storeViewCode}:purchaseHistory`;
        const purchasedProducts = shoppingCartContext.items.map((item) => item.product.sku);
        const purchaseHistory = JSON.parse(window.localStorage.getItem(key) || '[]');
        purchaseHistory.push({ date: new Date().toISOString(), items: purchasedProducts });
        window.localStorage.setItem(key, JSON.stringify(purchaseHistory.slice(-5)));
      });
    });
  })();
}

export function setJsonLd(data, name) {
  const existingScript = document.head.querySelector(`script[data-name="${name}"]`);
  if (existingScript) {
    existingScript.innerHTML = JSON.stringify(data);
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';

  script.innerHTML = JSON.stringify(data);
  script.dataset.name = name;
  document.head.appendChild(script);
}
