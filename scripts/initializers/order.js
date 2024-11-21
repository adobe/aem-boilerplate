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
  CUSTOMER_CREATE_RETURN_PATH,
  CREATE_RETURN_PATH,
  CUSTOMER_ORDERS_PATH,
  ORDER_STATUS_PATH,
  CUSTOMER_PATH, SALES_GUEST_VIEW_PATH, SALES_ORDER_VIEW_PATH,
} from '../constants.js';

await initializeDropin(async () => {
  const { pathname, searchParams } = new URL(window.location.href);
  const isAccountPage = pathname.includes(CUSTOMER_PATH);
  const orderRef = searchParams.get('orderRef');
  const returnRef = searchParams.get('returnRef');
  const isTokenProvided = orderRef && orderRef.length > 20;
  const labels = await fetchPlaceholders();
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  if (pathname.includes(CUSTOMER_ORDERS_PATH)) {
    return;
  }

  // Handle redirects for user details pages
  if (pathname === ORDER_DETAILS_PATH
    || pathname === CUSTOMER_ORDER_DETAILS_PATH
    || pathname === RETURN_DETAILS_PATH
    || pathname === CUSTOMER_RETURN_DETAILS_PATH
    || pathname === CREATE_RETURN_PATH
    || pathname === CUSTOMER_CREATE_RETURN_PATH
    || pathname === SALES_GUEST_VIEW_PATH
    || pathname === SALES_ORDER_VIEW_PATH) {
    await handleUserOrdersRedirects(
      pathname,
      isAccountPage,
      orderRef,
      returnRef,
      isTokenProvided,
      langDefinitions,
    );
    return;
  }

  await initializers.mountImmediately(initialize, {
    langDefinitions,
    orderRef,
    returnRef,
  });
})();

async function handleUserOrdersRedirects(
  pathname,
  isAccountPage,
  orderRef,
  returnRef,
  isTokenProvided,
  langDefinitions,
) {
  let targetPath = null;

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
