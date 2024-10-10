/* eslint-disable import/no-unresolved */

// Drop-in Tools
import { events } from '@dropins/tools/event-bus.js';
import {
  removeFetchGraphQlHeader,
  setEndpoint,
  setFetchGraphQlHeader,
} from '@dropins/tools/fetch-graphql.js';
import { initializers, Initializer } from '@dropins/tools/initializer.js';

// Drop-ins
import * as authApi from '@dropins/storefront-auth/api.js';
import * as cartApi from '@dropins/storefront-cart/api.js';
import * as orderApi from '@dropins/storefront-order/api.js';

// Recaptcha
import * as recaptcha from '@dropins/tools/recaptcha.js';

// Libs
import { checkIsAuthenticated, getConfigValue, getCookie } from './configs.js';
import { getMetadata } from './aem.js';
import {
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  ORDER_DETAILS_PATH,
  ORDER_STATUS_PATH,
  CUSTOMER_PATH,
} from './constants.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

const initializeOrderApi = (orderRef) => {
  initializers.register(orderApi.initialize, {
    orderRef,
  });
};

const handleUserOrdersRedirects = () => {
  const currentUrl = new URL(window.location.href);
  const isAccountPage = currentUrl.pathname.includes(CUSTOMER_PATH);
  const orderRef = currentUrl.searchParams.get('orderRef');
  const isTokenProvided = orderRef && orderRef.length > 20;

  let targetPath = null;
  if (currentUrl.pathname.includes(CUSTOMER_ORDERS_PATH)) {
    return;
  }

  events.on('order/error', () => {
    if (checkIsAuthenticated()) {
      window.location.href = CUSTOMER_ORDERS_PATH;
    } else if (isTokenProvided) {
      window.location.href = ORDER_STATUS_PATH;
    } else {
      window.location.href = `${ORDER_STATUS_PATH}?orderRef=${orderRef}`;
    }
  });

  if (checkIsAuthenticated()) {
    if (!orderRef) {
      targetPath = CUSTOMER_ORDERS_PATH;
    } else if (isAccountPage) {
      targetPath = isTokenProvided
        ? `${ORDER_DETAILS_PATH}?orderRef=${orderRef}`
        : null;
    } else {
      targetPath = isTokenProvided
        ? null
        : `${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderRef}`;
    }
  } else {
    targetPath = !orderRef ? ORDER_STATUS_PATH : null;
  }

  if (targetPath) {
    window.location.href = targetPath;
  } else {
    initializeOrderApi(orderRef);
  }
};

// Update auth headers
const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  } else {
    removeFetchGraphQlHeader('Authorization');
  }
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

const initialize = new Initializer({
  init: () => {
    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);
    // emit authenticated event if token has changed
    events.emit('authenticated', !!token);
  },
  listeners: () => [
    // Set auth headers on authenticated event
    events.on('authenticated', setAuthHeaders),
    // Cache cart data in session storage
    events.on('cart/data', persistCartDataInSession, { eager: true }),
  ],
});

export default async function initializeDropins() {
  // Register Initializers (Global)
  initializers.register(initialize, {});
  initializers.register(authApi.initialize, {});
  initializers.register(cartApi.initialize, {});

  // Get current page template metadata
  const templateMeta = getMetadata('template');
  const isOrderDetailsPage = templateMeta.includes('Order-Details');

  if (isOrderDetailsPage) {
    handleUserOrdersRedirects();
  }

  const mount = async () => {
    // Event Bus Logger
    events.enableLogger(true);
    // Set Fetch Endpoint (Global)
    setEndpoint(await getConfigValue('commerce-core-endpoint'));
    // Recaptcha
    recaptcha.setConfig();
    // Mount all registered drop-ins
    initializers.mount();
  };

  // Mount Drop-ins
  window.addEventListener('pageshow', mount);
  document.addEventListener('prerenderingchange', mount);
}
