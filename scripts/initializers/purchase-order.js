import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-purchase-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializeDropin } from './index.js';
import {
  CUSTOMER_PO_LIST_PATH,
  CUSTOMER_PO_DETAILS_PATH,
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
} from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/purchase-order.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  let poRef = '';
  const { pathname, searchParams } = new URL(window.location.href);

  // The poRef is required URL param to initialize PO details page
  if (pathname.includes(CUSTOMER_PO_DETAILS_PATH)) {
    poRef = searchParams.get('poRef') || '';
  }

  events.on(
    'purchase-order/error',
    (error) => {
      const { error: errorMessage } = error;

      // Place order error is part of normal flow, not exception
      if (errorMessage.includes('Unable to place order')) return;

      // Handle unexpected errors
      if (!pathname.includes(CUSTOMER_PO_LIST_PATH)) {
        window.location.href = rootLink(CUSTOMER_PO_LIST_PATH);
      }
    },
    { eager: true },
  );

  events.on('companyContext/changed', () => {
    if (pathname.includes(CUSTOMER_PO_DETAILS_PATH)) {
      events.emit('purchase-order/refresh', true);
    }
  }, { eager: true });

  // Initialize purchase order
  return initializers.mountImmediately(initialize, { langDefinitions, poRef });
})();
