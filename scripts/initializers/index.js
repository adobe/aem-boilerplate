/* eslint-disable import/no-cycle */
// Drop-in Tools
import { events } from '@dropins/tools/event-bus.js';
import {
  removeFetchGraphQlHeader,
  setEndpoint,
  setFetchGraphQlHeader,
} from '@dropins/tools/fetch-graphql.js';
import * as authApi from '@dropins/storefront-auth/api.js';

// Libs
import { getConfigValue, getCookie } from '../configs.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

// Update auth headers
const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  } else {
    removeFetchGraphQlHeader('Authorization');
    authApi.removeFetchGraphQlHeader('Authorization');
  }
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

export default async function initializeDropins() {
  // Set auth headers on authenticated event
  events.on('authenticated', setAuthHeaders);
  // Cache cart data in session storage
  events.on('cart/data', persistCartDataInSession, { eager: true });

  // on page load, check if user is authenticated
  const token = getUserTokenCookie();
  // set auth headers
  setAuthHeaders(!!token);
  // emit authenticated event if token has changed
  events.emit('authenticated', !!token);

  // Event Bus Logger
  events.enableLogger(true);
  // Set Fetch Endpoint (Global)
  setEndpoint(await getConfigValue('commerce-core-endpoint'));

  events.on('eds/lcp', async () => {
    // Recaptcha
    await import('@dropins/tools/recaptcha.js').then(({ setConfig }) => {
      setConfig();
    });
  });

  // Initialize Global Drop-ins
  await import('./auth.js');
  import('./cart.js');
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
  document.addEventListener('prerenderingchange', () => init(true));

  return init;
}
