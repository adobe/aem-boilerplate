import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { PurchaseOrderHistoryLog } from '@dropins/storefront-purchase-order/containers/PurchaseOrderHistoryLog.js';
import { PO_PERMISSIONS } from '@dropins/storefront-purchase-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/purchase-order.js';

const redirectToLogin = () => {
  window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
};

const redirectToAccountDashboard = () => {
  window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
};

/**
 * Initializes and decorates the Purchase Order History Log block
 * Redirects unauthenticated users and handles permission updates
 */
const renderPurchaseOrderHistoryLog = async (blockElement, permissions = {}) => {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');
  const hasAccess = permissions.admin || permissions[PO_PERMISSIONS.VIEW_CUSTOMER];

  if (!isB2BEnabled || !hasAccess) {
    redirectToAccountDashboard();
    return;
  }

  await purchaseOrderRenderer.render(PurchaseOrderHistoryLog, {})(blockElement);
};

export default async function decorate(block) {
  // Redirect guest users
  if (!checkIsAuthenticated()) {
    redirectToLogin();
    return;
  }

  // Initial permissions check
  const initialPermissions = events.lastPayload('auth/permissions');
  await renderPurchaseOrderHistoryLog(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderPurchaseOrderHistoryLog(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
