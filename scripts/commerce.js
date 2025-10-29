import { getCookie } from '@dropins/tools/lib.js';
import {
  getHeaders,
  getConfigValue,
  getRootPath,
  initializeConfig,
  getListOfRootPaths,
} from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';
import { FetchGraphQL } from '@dropins/tools/fetch-graphql.js';
import { getMetadata } from './aem.js';
import initializeDropins from './initializers/index.js';

/**
 * Fetch GraphQL Instances
 */

// Core Fetch GraphQL Instance
export const CORE_FETCH_GRAPHQL = new FetchGraphQL();

// Catalog Service Fetch GraphQL Instance
export const CS_FETCH_GRAPHQL = new FetchGraphQL();

/**
 * Constants
 */

// PATHS
export const SUPPORT_PATH = '/support';
export const PRIVACY_POLICY_PATH = '/privacy-policy';

// GUEST PATHS
export const ORDER_STATUS_PATH = '/order-status';
export const ORDER_DETAILS_PATH = '/order-details';
export const RETURN_DETAILS_PATH = '/return-details';
export const CREATE_RETURN_PATH = '/create-return';
export const SALES_GUEST_VIEW_PATH = '/sales/guest/view/';

// CUSTOMER PATHS
export const CUSTOMER_PATH = '/customer';
export const CUSTOMER_ORDER_DETAILS_PATH = `${CUSTOMER_PATH}${ORDER_DETAILS_PATH}`;
export const CUSTOMER_RETURN_DETAILS_PATH = `${CUSTOMER_PATH}${RETURN_DETAILS_PATH}`;
export const CUSTOMER_CREATE_RETURN_PATH = `${CUSTOMER_PATH}${CREATE_RETURN_PATH}`;
export const CUSTOMER_ORDERS_PATH = `${CUSTOMER_PATH}/orders`;
export const CUSTOMER_RETURNS_PATH = `${CUSTOMER_PATH}/returns`;
export const CUSTOMER_ADDRESS_PATH = `${CUSTOMER_PATH}/address`;
export const CUSTOMER_LOGIN_PATH = `${CUSTOMER_PATH}/login`;
export const CUSTOMER_ACCOUNT_PATH = `${CUSTOMER_PATH}/account`;
export const CUSTOMER_FORGOTPASSWORD_PATH = `${CUSTOMER_PATH}/forgotpassword`;
export const SALES_ORDER_VIEW_PATH = '/sales/order/view/';

// TRACKING URL
export const UPS_TRACKING_URL = 'https://www.ups.com/track';

/**
 * Auth Privacy Policy Consent Slot
 * @param {Object} ctx - The context object
 * @param {Object} ctx.appendChild - The appendChild function
 * @returns {void}
 */
export const authPrivacyPolicyConsentSlot = {
  PrivacyPolicyConsent: async (ctx) => {
    const wrapper = document.createElement('span');
    Object.assign(wrapper.style, {
      color: 'var(--color-neutral-700)',
      font: 'var(--type-details-caption-2-font)',
      display: 'block',
      marginBottom: 'var(--spacing-medium)',
    });

    const link = document.createElement('a');
    link.href = PRIVACY_POLICY_PATH;
    link.target = '_blank';
    link.textContent = 'Privacy Policy';

    wrapper.append(
      'By creating an account, you acknowledge that you have read and agree to our ',
      link,
      ', which outlines how we collect, use, and protect your personal data.',
    );

    ctx.appendChild(wrapper);
  },
};

/**
 * Preloads a file with specified attributes
 * @param {string} href - The URL to preload
 * @param {string} as - The type of resource being preloaded
 */
export function preloadFile(href, as) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Notifies dropins about the current loading state.
 * @param {string} event The loading state to notify
 */
function notifyUI(event) {
  // skip if the event was already sent
  if (events.lastPayload(`aem/${event}`) === event) return;
  // notify dropins about the current loading state
  const handleEmit = () => events.emit(`aem/${event}`);
  // listen for prerender event
  document.addEventListener('prerenderingchange', handleEmit, { once: true });
  // emit the event immediately
  handleEmit();
}

/**
 * Detects the page type based on DOM elements
 * @returns {string} The detected page type
 */
function detectPageType() {
  if (document.body.querySelector('main .product-details')) {
    return 'Product';
  } if (document.body.querySelector('main .product-list-page')) {
    return 'Category';
  } if (document.body.querySelector('main .commerce-cart')) {
    return 'Cart';
  } if (document.body.querySelector('main .commerce-checkout')) {
    return 'Checkout';
  }
  return 'CMS';
}

/**
 * Handles commerce-specific page type initialization
 * @param {string} pageType - The detected page type
 */
async function handleCommercePageType(pageType) {
  if (pageType === 'Product') {
    // initialize pdp
    await import('./initializers/pdp.js');
  }
}

/**
 * Initializes Adobe Data Layer for commerce
 * @param {string} pageType - The detected page type
 */
function initializeAdobeDataLayer(pageType) {
  window.adobeDataLayer = window.adobeDataLayer || [];

  window.adobeDataLayer.push(
    {
      pageContext: {
        pageType,
        pageName: document.title,
        eventType: 'visibilityHidden',
        maxXOffset: 0,
        maxYOffset: 0,
        minXOffset: 0,
        minYOffset: 0,
      },
    },
    {
      shoppingCartContext: {
        totalQuantity: 0,
      },
    },
  );
  window.adobeDataLayer.push((dl) => {
    dl.push({ event: 'page-view', eventInfo: { ...dl.getState() } });
  });
}

/**
 * Fetches and merges index data from multiple sources with intelligent caching.
 * @param {string} indexFile - The index file to fetch
 * @param {number} pageSize - The page size for pagination
 * @returns {Promise<Object>} A promise that resolves the index object
 */
export async function fetchIndex(indexFile, pageSize = 500) {
  const handleIndex = async (offset) => {
    const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`);
    const json = await resp.json();

    const newIndex = {
      complete: (json.limit + json.offset) === json.total,
      offset: json.offset + pageSize,
      promise: null,
      data: [...window.index[indexFile].data, ...json.data],
    };

    return newIndex;
  };

  window.index = window.index || {};
  window.index[indexFile] = window.index[indexFile] || {
    data: [],
    offset: 0,
    complete: false,
    promise: null,
  };

  // Return index if already loaded
  if (window.index[indexFile].complete) {
    return window.index[indexFile];
  }

  // Return promise if index is currently loading
  if (window.index[indexFile].promise) {
    return window.index[indexFile].promise;
  }

  window.index[indexFile].promise = handleIndex(window.index[indexFile].offset);
  const newIndex = await (window.index[indexFile].promise);
  window.index[indexFile] = newIndex;

  return newIndex;
}

/**
 * Loads commerce-specific eager content
 */
export async function loadCommerceEager() {
  const pageType = detectPageType();
  initializeAdobeDataLayer(pageType);
  await handleCommercePageType(pageType);

  // notify that the page is ready for eager loading
  notifyUI('lcp');
}

/**
 * Decorates links in the main element.
 * @param {Element} main - The main element
 */
export function decorateLinks(main) {
  const root = getRootPath();
  const roots = getListOfRootPaths();

  main.querySelectorAll('a').forEach((a) => {
    // If we are in the root, do nothing
    if (roots.length === 0) return;

    try {
      const url = new URL(a.href);
      const {
        origin,
        pathname,
        search,
        hash,
      } = url;

      // Skip localization if #nolocal flag is present
      if (hash === '#nolocal') {
        url.hash = '';
        a.href = url.toString();
        return;
      }

      // if the links belongs to another store, do nothing
      if (roots.some((r) => r !== root && pathname.startsWith(r))) return;

      // If the link is already localized, do nothing
      if (origin !== window.location.origin || pathname.startsWith(root)) return;
      a.href = new URL(`${origin}${root}${pathname.replace(/^\//, '')}${search}${hash}`);
    } catch {
      console.warn('Could not make localized link');
    }
  });
}

/**
 * Loads commerce-specific lazy content
 */
export async function loadCommerceLazy() {
  // Initialize modal functionality
  autolinkModals(document);

  // Initialize Adobe Client Data Layer
  await import('./acdl/adobe-client-data-layer.min.js');

  // Track history
  trackHistory();
}

/**
 * Initializes commerce configuration
 */
export async function initializeCommerce() {
  // Initialize Config
  initializeConfig(await getConfigFromSession());

  // Set Fetch GraphQL (Core)
  CORE_FETCH_GRAPHQL.setEndpoint(getConfigValue('commerce-core-endpoint'));
  CORE_FETCH_GRAPHQL.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('all') }));

  // Set Fetch GraphQL (Catalog Service)
  CS_FETCH_GRAPHQL.setEndpoint(await commerceEndpointWithQueryParams());
  CS_FETCH_GRAPHQL.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

  return initializeDropins();
}

/**
 * Decorates links.
 * @param {string} [link] url to be localized
 * @returns {string} - The localized link
 */
export function rootLink(link) {
  const root = getRootPath().replace(/\/$/, '');

  // If the link is already localized, do nothing
  if (link.startsWith(root)) return link;
  return `${root}${link}`;
}

/**
 * Decorates Columns Template to the main element.
 * @param {Element} doc The document element
 */
function buildTemplateColumns(doc) {
  const columns = doc.querySelectorAll('main > div.section[data-column-width]');

  columns.forEach((column) => {
    const columnWidth = column.getAttribute('data-column-width');
    const gap = column.getAttribute('data-gap');

    if (columnWidth) {
      column.style.setProperty('--column-width', columnWidth);
      column.removeAttribute('data-column-width');
    }

    if (gap) {
      column.style.setProperty('--gap', `var(--spacing-${gap.toLocaleLowerCase()})`);
      column.removeAttribute('data-gap');
    }
  });
}

/**
 * Applies templates to the document.
 * @param {Element} doc The document element
 */
export function applyTemplates(doc) {
  if (doc.body.classList.contains('columns')) {
    buildTemplateColumns(doc);
  }
}

/**
 * Fetches and merges placeholder data from multiple sources with intelligent caching.
 *
 * This function retrieves placeholder data from a path-specific file and optional fallback file,
 * then merges them together. It implements request deduplication to prevent multiple simultaneous
 * requests for the same resources and caches results for optimal performance.
 *
 * @param {string} [path] - Optional path to a specific placeholders file to include in the merge.
 *                         If provided, this file's data will be merged with fallback data.
 *                         If not provided, returns all currently cached placeholders.
 * @returns {Promise<Object>} A promise that resolves the merged placeholders object.
 * @example
 * // Get all currently cached placeholders (no fetching)
 * const allPlaceholders = await fetchPlaceholders();
 *
 * // Fetch placeholders with specific path
 * const placeholders = await fetchPlaceholders('placeholders/auth.json');
 *
 * // Get all placeholders including newly fetched ones
 * const updatedPlaceholders = await fetchPlaceholders();
 */
export async function fetchPlaceholders(path) {
  const rootPath = getRootPath();
  const fallback = getMetadata('placeholders');
  window.placeholders = window.placeholders || {};

  // Track pending requests to prevent duplicate fetches
  window.placeholders._pending = window.placeholders._pending || {};

  // Initialize merged results storage as a single merged object
  window.placeholders._merged = window.placeholders._merged || {};

  // If no path is provided, return the merged placeholders
  if (!path) {
    return Promise.resolve(window.placeholders._merged || {});
  }

  // Create cache key for this specific combination
  const cacheKey = [path, fallback].filter(Boolean).join('|');

  // Prevent empty cache keys
  if (!cacheKey) {
    return Promise.resolve({});
  }

  // Check if there's already a pending request for this combination
  if (window.placeholders._pending[cacheKey]) {
    return window.placeholders._pending[cacheKey];
  }

  // fetch placeholders
  const fetchPromise = new Promise((resolve) => {
    const promises = [];

    // Helper function to get or create fetch promise for a single resource
    const getOrCreateFetch = (url, resourceCacheKey) => {
      // Check if already cached
      if (window.placeholders[resourceCacheKey]) {
        return Promise.resolve(window.placeholders[resourceCacheKey]);
      }

      // Check if already pending
      if (window.placeholders._pending[resourceCacheKey]) {
        return window.placeholders._pending[resourceCacheKey];
      }

      // Create new fetch promise
      const resourceFetchPromise = fetch(`${url}?sheet=data`).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          // Cache the response
          window.placeholders[resourceCacheKey] = data;
          return data;
        }
        console.warn(`Failed to fetch placeholders from ${url}: HTTP ${response.status} ${response.statusText}`);
        return {};
      }).catch((error) => {
        console.error(`Error fetching placeholders from ${url}:`, error);
        return {};
      }).finally(() => {
        // Remove from pending
        delete window.placeholders._pending[resourceCacheKey];
      });

      // Store pending promise
      window.placeholders._pending[resourceCacheKey] = resourceFetchPromise;
      return resourceFetchPromise;
    };

    // path
    if (path) {
      const pathUrl = rootPath.replace(/\/$/, `/${path}`);
      promises.push(getOrCreateFetch(pathUrl, path));
    }

    // fallback - only if it exists from overrides
    if (fallback) {
      promises.push(getOrCreateFetch(fallback, fallback));
    }

    Promise.all(promises)
      // process json from sources and combine them
      .then((jsons) => {
        // Early return if no data
        const hasData = jsons.some((json) => json.data?.length > 0);
        if (!hasData) {
          console.warn(`No placeholder data found for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`);
          resolve({});
          return;
        }

        // Create data object where later values override earlier ones
        const data = {};

        // Process all JSONs in one pass
        jsons.forEach((json) => {
          if (json.data?.length) {
            json.data.forEach(({ Key, Value }) => {
              if (Key && Value !== undefined) {
                data[Key] = Value;
              }
            });
          }
        });

        // Early return if no valid data
        if (Object.keys(data).length === 0) {
          console.warn(`No valid placeholder data found after processing for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`);
          resolve({});
          return;
        }

        // Convert data object to placeholders object with nested structure
        const placeholders = {};

        Object.entries(data).forEach(([Key, Value]) => {
          const keys = Key.split('.');
          const lastKey = keys.pop();
          let target = placeholders;

          // Navigate/create nested structure
          keys.forEach((key) => {
            target[key] = target[key] || {};
            target = target[key];
          });

          // Set the final value
          target[lastKey] = Value;
        });

        // Merge the new placeholders into the global merged object
        const merged = Object.assign(window.placeholders._merged, placeholders);

        resolve(merged);
      })
      .catch((error) => {
        console.error(`Error loading placeholders for path: ${path}${fallback ? ` and fallback: ${fallback}` : ''}`, error);
        // error loading placeholders
        resolve({});
      });
  });

  // Store the pending promise for this combination
  window.placeholders._pending[cacheKey] = fetchPromise;

  // Clean up pending promise when resolved
  fetchPromise.finally(() => {
    delete window.placeholders._pending[cacheKey];
  });

  return fetchPromise;
}

/**
 * Fetches config from remote and saves in session, then returns it, otherwise
 * returns if it already exists.
 *
 * @returns {Promise<Object>} - The config JSON from session storage
 */
export async function getConfigFromSession() {
  const configURL = `${window.location.origin}/config.json`;

  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (
      !parsedConfig[':expiry']
      || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)
    ) {
      throw new Error('Config expired');
    }
    return parsedConfig;
  } catch (e) {
    const config = await fetch(configURL);
    if (!config.ok) throw new Error('Failed to fetch config');
    const configJSON = await config.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    return configJSON;
  }
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

/**
 * Creates a commerce endpoint URL with query parameters including a cache-busting hash.
 * @returns {Promise<URL>} A promise that resolves to the endpoint URL with query parameters
 */
export async function commerceEndpointWithQueryParams() {
  const urlWithQueryParams = new URL(getConfigValue('commerce-endpoint'));
  const headers = getHeaders('cs');
  const shortHash = createHashFromObject(headers);
  urlWithQueryParams.searchParams.append('cb', shortHash);
  return urlWithQueryParams;
}

/**
 * Extracts the SKU from the current URL path.
 * @returns {string|null} The SKU extracted from the URL, or null if not found
 */
function getSkuFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/products\/[\w|-]+\/([\w|-]+)$/);
  return result?.[1];
}

export function getProductLink(urlKey, sku) {
  return rootLink(`/products/${urlKey}/${sku}`.toLowerCase());
}

/**
 * Gets the product SKU from metadata or URL fallback.
 * @returns {string|null} The SKU from metadata or URL, or null if not found
 */
export function getProductSku() {
  return getMetadata('sku') || getSkuFromUrl();
}

/**
 * Extracts option UIDs from the URL search parameters.
 * @returns {string[]|undefined} Array of option UIDs, or undefined if not found
 */
export function getOptionsUIDsFromUrl() {
  return new URLSearchParams(window.location.search).get('optionsUIDs')?.split(',');
}

/**
 * Tracks user browsing and purchase history for recommendations.
 * Stores product view history and purchase history in localStorage.
 */
function trackHistory() {
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

/**
 * Sets JSON-LD structured data in the document head.
 * @param {Object} data - The JSON-LD data object
 * @param {string} name - The name identifier for the script element
 */
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

/**
 * Loads and displays an error page (e.g., 404) by replacing the current page content.
 * @param {number} [code=404] - The HTTP error code for the error page
 */
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

/**
 * Checks if the user is authenticated
 * @returns {boolean} - true if the user is authenticated
 */
export function checkIsAuthenticated() {
  return !!getCookie('auth_dropin_user_token') ?? false;
}

/**
 * Check if consent was given for a specific topic.
 * @param {*} topic Topic identifier
 * @returns {boolean} True if consent was given
 */
export function getConsent(_topic) {
  console.warn('getConsent not implemented');
  return true;
}

/**
 * Automatically links modal functionality to elements
 * @param {Element} element - The element to attach modal functionality to
 */
function autolinkModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');

    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault();
      const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
      openModal(origin.href);
    }
  });
}
