import { render as purchaseOrderRenderer } from '@dropins/storefront-purchase-order/render.js';
import { ApprovalRuleDetails } from '@dropins/storefront-purchase-order/containers/ApprovalRuleDetails.js';
import { PO_PERMISSIONS } from '@dropins/storefront-purchase-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_PO_RULES_PATH,
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

const redirectToApprovalRulesList = () => {
  window.location.href = rootLink(CUSTOMER_PO_RULES_PATH);
};

/**
 * Initializes and decorates the Approval Rule Details block
 * Redirects unauthenticated users and handles permission updates
 */
const renderApprovalRuleDetails = async (blockElement, permissions = {}) => {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');
  const hasAccess = permissions.admin || permissions[PO_PERMISSIONS.VIEW_RULES];

  if (!isB2BEnabled || !hasAccess) {
    redirectToAccountDashboard();
    return;
  }

  const approvalRuleID = new URLSearchParams(window.location.search).get('ruleRef') || '';
  if (!approvalRuleID) {
    redirectToApprovalRulesList();
    return;
  }

  await purchaseOrderRenderer.render(ApprovalRuleDetails, {
    approvalRuleID,
    withWrapper: false,
    routeApprovalRulesList: () => rootLink(CUSTOMER_PO_RULES_PATH),
  })(blockElement);
};

export default async function decorate(block) {
  // Redirect guest users
  if (!checkIsAuthenticated()) {
    redirectToLogin();
    return;
  }

  // Initial permissions check
  const initialPermissions = events.lastPayload('auth/permissions');
  await renderApprovalRuleDetails(block, initialPermissions);

  // React to permission updates
  events.on('auth/permissions', async (updatedPermissions) => {
    await renderApprovalRuleDetails(block, updatedPermissions);
  });

  // Handle logout during interaction
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated) redirectToLogin();
  });
}
