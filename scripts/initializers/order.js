import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize } from '@dropins/storefront-order/api.js';
import { checkIsAuthenticated } from '../configs.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';

import {
  CUSTOMER_ORDER_DETAILS_PATH,
  ORDER_DETAILS_PATH,
  CUSTOMER_RETURN_DETAILS_PATH,
  RETURN_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  ORDER_STATUS_PATH,
  CUSTOMER_PATH,
} from '../constants.js';

initializeDropin(async () => {
  const { pathname, searchParams } = new URL(window.location.href);
  const isAccountPage = pathname.includes(CUSTOMER_PATH);
  const orderRef = searchParams.get('orderRef');
  const returnRef = searchParams.get('returnRef');
  const isTokenProvided = orderRef && orderRef.length > 20;

  // Handle redirects for user details pages
  if (pathname === ORDER_DETAILS_PATH
    || pathname === CUSTOMER_ORDER_DETAILS_PATH
    || pathname === RETURN_DETAILS_PATH
    || pathname === CUSTOMER_RETURN_DETAILS_PATH) {
    await handleUserOrdersRedirects(pathname, isAccountPage, orderRef, returnRef, isTokenProvided);
  }
})();

async function handleUserOrdersRedirects(
  pathname,
  isAccountPage,
  orderRef,
  returnRef,
  isTokenProvided,
) {
  const labels = await fetchPlaceholders();

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  let targetPath = null;
  if (pathname.includes(CUSTOMER_ORDERS_PATH)) {
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
    await initializers.mountImmediately(initialize, {
      langDefinitions,
      orderRef,
      returnRef,
    });
  }
}
