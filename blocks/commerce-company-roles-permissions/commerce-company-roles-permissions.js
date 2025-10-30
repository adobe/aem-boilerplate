import { render as provider } from '@dropins/storefront-company-management/render.js';
import { RolesAndPermissions } from '@dropins/storefront-company-management/containers/RolesAndPermissions.js';
import {
  checkIsAuthenticated,
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
} from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-company-roles-permissions-container');

  // Check authentication and redirect if not authenticated
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  const isAuthenticated = checkIsAuthenticated();

  await provider.render(RolesAndPermissions, {
    isAuthenticated,
    onRedirectLogin: () => {
      window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    },
    onRedirectAccount: () => {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    },
  })(block);
}
