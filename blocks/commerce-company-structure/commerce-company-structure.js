import { render as provider } from '@dropins/storefront-company-management/render.js';
import { CompanyStructure } from '@dropins/storefront-company-management/containers/CompanyStructure.js';
import {
  checkIsAuthenticated,
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
} from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-company-structure-container');

  const isAuthenticated = checkIsAuthenticated();

  await provider.render(CompanyStructure, {
    isAuthenticated,
    onRedirectLogin: () => {
      window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    },
    onRedirectAccount: () => {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    },
  })(block);
}
