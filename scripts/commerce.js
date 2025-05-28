/* eslint-disable import/prefer-default-export, import/no-cycle */
import { getMetadata } from './aem.js';
import {
  getHeaders,
  getConfigValue,
  getCookie,
  getRootPath,
} from './configs.js';
import { getConsent } from './scripts.js';

/**
 * Gets placeholders object.
 * @param {string} [prefix] Location of placeholders
 * @returns {object} Window placeholders object
 */
// eslint-disable-next-line import/prefer-default-export
export async function fetchPlaceholders(prefix = 'default') {
  const overrides = getMetadata('placeholders') || getRootPath().replace(/\/$/, '/placeholders.json') || '';
  const [fallback, override] = overrides.split('\n');
  window.placeholders = window.placeholders || {};

  if (!window.placeholders[prefix]) {
    window.placeholders[prefix] = new Promise((resolve) => {
      const url = fallback || `${prefix === 'default' ? '' : prefix}/placeholders.json`;
      Promise.all([fetch(url), override ? fetch(override) : Promise.resolve()])
        // get json from sources
        .then(async ([resp, oResp]) => {
          if (resp.ok) {
            if (oResp?.ok) {
              return Promise.all([resp.json(), await oResp.json()]);
            }
            return Promise.all([resp.json(), {}]);
          }
          return [{}];
        })
        // process json from sources
        .then(([json, oJson]) => {
          const placeholders = {};

          const allKeys = new Set([
            ...(json.data?.map(({ Key }) => Key) || []),
            ...(oJson?.data?.map(({ Key }) => Key) || []),
          ]);

          allKeys.forEach((Key) => {
            if (!Key) return;
            const keys = Key.split('.');
            const originalValue = json.data?.find((item) => item.Key === Key)?.Value;
            const overrideValue = oJson?.data?.find((item) => item.Key === Key)?.Value;
            const finalValue = overrideValue ?? originalValue;
            const lastKey = keys.pop();
            const target = keys.reduce((obj, key) => {
              obj[key] = obj[key] || {};
              return obj[key];
            }, placeholders);
            target[lastKey] = finalValue;
          });

          window.placeholders[prefix] = placeholders;
          resolve(placeholders);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('error loading placeholders', error);
          // error loading placeholders
          window.placeholders[prefix] = {};
          resolve(window.placeholders[prefix]);
        });
    });
  }
  return window.placeholders[`${prefix}`];
}

/* Common query fragments */
export const priceFieldsFragment = `fragment priceFields on ProductViewPrice {
  roles
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

export async function commerceEndpointWithQueryParams() {
  const urlWithQueryParams = new URL(getConfigValue('commerce-endpoint'));
  const headers = getHeaders('cs');
  const shortHash = createHashFromObject(headers);
  urlWithQueryParams.searchParams.append('cb', shortHash);
  return urlWithQueryParams;
}

/* Common functionality */

export async function performCatalogServiceQuery(query, variables) {
  const headers = {
    ...(getHeaders('cs')),
    'Content-Type': 'application/json',
  };

  const apiCall = await commerceEndpointWithQueryParams();
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
  return getCookie('auth_dropin_user_token');
}

export async function performMonolithGraphQLQuery(query, variables, GET = true, USE_TOKEN = false) {
  const GRAPHQL_ENDPOINT = getConfigValue('commerce-core-endpoint');

  const headers = {
    'Content-Type': 'application/json',
    Store: getConfigValue('headers.cs.Magento-Store-View-Code'),
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

export function getOptionsUIDsFromUrl() {
  return new URLSearchParams(window.location.search).get('optionsUIDs')?.split(',');
}

export async function trackHistory() {
  if (!getConsent('commerce-recommendations')) {
    return;
  }
  // Store product view history in session storage
  const storeViewCode = getConfigValue('headers.cs.Magento-Store-View-Code');
  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', (event) => {
      if (!event.productContext) {
        return;
      }
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

export async function loadErrorPage(code = 404) {
  const htmlText = await fetch(`/${code}.html`).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error(`Error getting ${code} page`);
  });
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  document.body.innerHTML = doc.body.innerHTML;
  // get dropin styles
  document.head.querySelectorAll('style[data-dropin]').forEach((style) => {
    doc.head.appendChild(style);
  });
  document.head.innerHTML = doc.head.innerHTML;

  // https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript
  // Point 2. prevent soft 404 errors
  if (code === 404) {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex';
    document.head.appendChild(metaRobots);
  }

  // When moving script tags via innerHTML, they are not executed. They need to be re-created.
  const notImportMap = (c) => c.textContent && c.type !== 'importmap';
  Array.from(document.head.querySelectorAll('script'))
    .filter(notImportMap)
    .forEach((c) => c.remove());
  Array.from(doc.head.querySelectorAll('script'))
    .filter(notImportMap)
    .forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(({ name, value }) => {
        newScript.setAttribute(name, value);
      });
      const scriptText = document.createTextNode(oldScript.innerHTML);
      newScript.appendChild(scriptText);
      document.head.appendChild(newScript);
    });
}

export function mapProductAcdl(product) {
  const regularPrice = product?.priceRange?.minimum?.regular?.amount.value
    || product?.price?.regular?.amount.value || 0;
  const specialPrice = product?.priceRange?.minimum?.final?.amount.value
    || product?.price?.final?.amount.value;
  // storefront-events-collector will use storefrontInstanceContext.storeViewCurrencyCode
  // if undefined, no default value is necessary.
  const currencyCode = product?.priceRange?.minimum?.final?.amount.currency
    || product?.price?.final?.amount.currency || undefined;
  const minimalPrice = product?.priceRange ? regularPrice : undefined;
  const maximalPrice = product?.priceRange
    ? product?.priceRange?.maximum?.regular?.amount.value : undefined;

  return {
    productId: parseInt(product.externalId, 10) || 0,
    name: product?.name,
    sku: product?.variantSku || product?.sku,
    topLevelSku: product?.sku,
    pricing: {
      regularPrice,
      minimalPrice,
      maximalPrice,
      specialPrice,
      currencyCode,
    },
    canonicalUrl: new URL(`/products/${product.urlKey}/${product.sku}`, window.location.origin).toString(),
    mainImageUrl: product?.images?.[0]?.url,
  };
}
