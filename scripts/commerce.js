/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  getConfigValue, getCookie, getHeaders,
} from './configs.js';
import { getConsent } from './scripts.js';

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

export async function commerceEndpointWithQueryParams() {
  const urlWithQueryParams = new URL(await getConfigValue('commerce-endpoint'));
  // Set some query parameters for use as a cache-buster. No other purpose.
  urlWithQueryParams.searchParams.append('ac-storecode', await getConfigValue('commerce.headers.cs.Magento-Store-Code'));
  return urlWithQueryParams;
}

/* Common functionality */

export async function performCatalogServiceQuery(query, variables) {
  const headers = {
    ...(await getHeaders('cs')),
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
  const GRAPHQL_ENDPOINT = await getConfigValue('commerce-core-endpoint');

  const headers = {
    'Content-Type': 'application/json',
    Store: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
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
  const storeViewCode = await getConfigValue('commerce.headers.cs.Magento-Store-View-Code');
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
