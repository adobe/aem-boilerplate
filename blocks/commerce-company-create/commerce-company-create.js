import { render as provider } from '@dropins/storefront-company-management/render.js';
import { CompanyRegistration } from '@dropins/storefront-company-management/containers/CompanyRegistration.js';
import {
  checkIsAuthenticated,
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  authPrivacyPolicyConsentSlot,
} from '../../scripts/commerce.js';
import {
  checkB2BFrontendConfig,
} from '../../scripts/commerce-b2b.js';
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-company-create-container');

  const isAuthenticated = checkIsAuthenticated();

  // Check frontend configuration
  const frontendAllowsB2B = checkB2BFrontendConfig();

  if (!frontendAllowsB2B) {
    if (isAuthenticated) {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    } else {
      window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    }
    return;
  }

  // Dropin handles backend checks and authentication logic
  await provider.render(CompanyRegistration, {
    isAuthenticated,
    onRedirectLogin: () => {
      window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    },
    onRedirectAccount: () => {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    },
    slots: {
      ...authPrivacyPolicyConsentSlot,
    },
  })(block);
}
