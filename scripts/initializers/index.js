// Drop-in Tools
import { getCookie } from '@dropins/tools/lib.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { isAemAssetsEnabled } from '@dropins/tools/lib/aem/assets.js';
import { getConfigValue, getRootPath } from '@dropins/tools/lib/aem/configs.js';
import { getCustomerData } from '@dropins/storefront-auth/api.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

const DROPIN_WEBSITE_COOKIE = 'dropin_website_path';
const DEFAULT_NLI_CUSTOMER_GROUP_ID = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';
// Catalog Service headers mirrored onto Core GraphQL requests in ACO mode (case-insensitive).
const CORE_OPTIMIZER_HEADERS = ['AC-View-ID', 'AC-Price-Book-ID', 'AC-Catalog-View-Access-Token'];
const getWebsitePath = () => getRootPath() || '/';
const clearCookie = (name) => { document.cookie = `${name}=; path=/; Max-Age=0`; };
let catalogServiceCacheControlAdded = false;
let coreOptimizerHeadersAdded = false;
let currentCustomerGroupId;

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  } else {
    CORE_FETCH_GRAPHQL.removeFetchGraphQlHeader('Authorization');
  }
};

const sha1Base64 = async (value) => {
  const decoded = atob(value);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i += 1) {
    bytes[i] = decoded.charCodeAt(i);
  }
  const digest = await crypto.subtle.digest('SHA-1', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const setCustomerGroupHeader = (customerGroupId) => {
  if (customerGroupId === currentCustomerGroupId) {
    return;
  }

  CS_FETCH_GRAPHQL.setFetchGraphQlHeader('Magento-Customer-Group', customerGroupId);

  const { endpoint } = CS_FETCH_GRAPHQL.getConfig();
  if (endpoint) {
    const url = new URL(endpoint);
    url.searchParams.set('customer-group', customerGroupId);
    CS_FETCH_GRAPHQL.setEndpoint(url.toString());
  }

  currentCustomerGroupId = customerGroupId;
  events.emit('commerce/customer-context', { customerGroupId });
};

const fetchCustomerGroupId = async () => {
  const token = getUserTokenCookie();
  if (!token) {
    return;
  }

  try {
    const customer = await getCustomerData(token);
    if (customer?.groupUid) {
      setCustomerGroupHeader(await sha1Base64(customer.groupUid));
    }
  } catch (error) {
    console.debug('Unable to resolve customer group for Catalog Service:', error);
  }
};

const handleCustomerGroupUid = (customerGroupId) => {
  if (getUserTokenCookie() && customerGroupId === DEFAULT_NLI_CUSTOMER_GROUP_ID) {
    return;
  }

  setCustomerGroupHeader(customerGroupId);
};

const updateAuthContext = async (state) => {
  setAuthHeaders(state);

  if (!getConfigValue('adobe-commerce-optimizer') && state) {
    await fetchCustomerGroupId();
  }
};

const setupCatalogServiceCacheControl = () => {
  if (catalogServiceCacheControlAdded) {
    return;
  }

  CS_FETCH_GRAPHQL.addBeforeHook((request) => ({
    ...request,
    cache: 'no-store',
  }));
  catalogServiceCacheControlAdded = true;
};

/**
 * Ad-hoc solution for ACCS tenants with CCDM mode enabled: to resolve
 * ProductInterface.price_range for requests to coreSaaS (e.g. get cart), Core needs the same
 * catalog view and price book headers as Catalog Service. Copy the current Catalog Service
 * values of CORE_OPTIMIZER_HEADERS (static headers.cs or set dynamically) onto every Core
 * request, so Core always matches Catalog Service.
 */
const setupCoreOptimizerHeaders = () => {
  if (coreOptimizerHeadersAdded) {
    return;
  }

  const allowList = CORE_OPTIMIZER_HEADERS.map((key) => key.toLowerCase());
  const isOptimizerHeader = (key) => allowList.includes(key.toLowerCase());
  CORE_FETCH_GRAPHQL.addBeforeHook((request) => {
    const { fetchGraphQlHeaders } = CS_FETCH_GRAPHQL.getConfig();
    const headers = Object.fromEntries(
      Object.entries(request.headers).filter(([key]) => !isOptimizerHeader(key)),
    );
    Object.entries(fetchGraphQlHeaders)
      .filter(([key]) => isOptimizerHeader(key))
      .forEach(([key, value]) => { headers[key] = value; });
    return { ...request, headers };
  });
  coreOptimizerHeadersAdded = true;
};

const setAdobeCommerceOptimizerHeader = (adobeCommerceOptimizer) => {
  if (adobeCommerceOptimizer?.priceBookId) {
    CS_FETCH_GRAPHQL.setFetchGraphQlHeader('AC-Price-Book-ID', adobeCommerceOptimizer.priceBookId);
  } else {
    CS_FETCH_GRAPHQL.removeFetchGraphQlHeader('AC-Price-Book-ID');
  }
  events.emit('commerce/customer-context', adobeCommerceOptimizer);
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

const setupAemAssetsImageParams = () => {
  if (isAemAssetsEnabled()) {
    // Convert decimal values to integers for AEM Assets compatibility
    initializers.setImageParamKeys({
      width: (value) => ['width', value === undefined ? undefined : Math.floor(value)],
      height: (value) => ['height', value === undefined ? undefined : Math.floor(value)],
      quality: 'quality',
      auto: 'auto',
      crop: 'crop',
      fit: 'fit',
    });
  }
};

export default async function initializeDropins() {
  const init = async () => {
    // Set Customer-Group-ID header
    setupCatalogServiceCacheControl();
    if (getConfigValue('adobe-commerce-optimizer')) {
      setupCoreOptimizerHeaders();
      events.on('auth/adobe-commerce-optimizer', setAdobeCommerceOptimizerHeader, { eager: true });
    } else {
      events.on('auth/group-uid', handleCustomerGroupUid, { eager: true });
    }

    // Clear cart state when switching between websites to avoid stale cart IDs
    // and authentication state from a different website causing errors.
    const storedWebsitePath = getCookie(DROPIN_WEBSITE_COOKIE);
    const currentWebsitePath = getWebsitePath();
    if (storedWebsitePath && storedWebsitePath !== currentWebsitePath) {
      clearCookie('DROPIN__CART__CART-ID');
      sessionStorage.removeItem('DROPINS_CART_ID');
      sessionStorage.removeItem('DROPIN__CART__CART__DATA');
      sessionStorage.removeItem('DROPIN__CART__SHIPPING__DATA');
      localStorage.removeItem('DROPIN__CART__CART__AUTHENTICATED');
    }
    document.cookie = `${DROPIN_WEBSITE_COOKIE}=${currentWebsitePath}; path=/`;

    // Cache cart data in session storage
    events.on('cart/data', persistCartDataInSession, { eager: true });

    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);

    // Event Bus Logger
    events.enableLogger(true);

    // Set up AEM Assets image parameter conversion
    setupAemAssetsImageParams();

    // Fetch global placeholders
    await fetchPlaceholders('placeholders/global.json');

    // Initialize Global Drop-ins
    await import('./auth.js');

    // Auth must be initialized before getCustomerData uses its endpoint and config.
    // Await the initial pricing context here: event listeners are not awaited by
    // the event bus, and PDP/PLP loading must not race the customer group lookup.
    await updateAuthContext(!!getUserTokenCookie());

    // Handle subsequent sign-in/sign-out changes after startup context is ready.
    events.on('authenticated', updateAuthContext);

    await import('./personalization.js');

    import('./cart.js');

    events.on('aem/lcp', async () => {
      // Recaptcha
      await import('@dropins/tools/recaptcha.js').then((recaptcha) => {
        recaptcha.setEndpoint(CORE_FETCH_GRAPHQL);
        recaptcha.enableLogger(true);
        return recaptcha.setConfig();
      });
    }, { eager: true });
  };

  // re-initialize on prerendering changes
  document.addEventListener('prerenderingchange', initializeDropins, { once: true });

  return init();
}

export function initializeDropin(cb) {
  let initialized = false;

  const init = async (force = false) => {
    // prevent re-initialization
    if (initialized && !force) return;
    // initialize drop-in
    await cb();
    initialized = true;
  };

  // re-initialize on prerendering changes
  document.addEventListener('prerenderingchange', () => init(true), { once: true });

  return init;
}
