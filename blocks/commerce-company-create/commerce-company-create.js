import { render as provider } from '@dropins/storefront-company-management/render.js';
import { CompanyRegistration } from '@dropins/storefront-company-management/containers/CompanyRegistration.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import {
  checkIsAuthenticated,
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  authPrivacyPolicyConsentSlot,
} from '../../scripts/commerce.js';
import '../../scripts/initializers/company.js';

/**
 * Check frontend configuration (commerce-companies-enabled) for B2B override
 * @returns {boolean}
 *   - true: Frontend enables B2B (explicit true OR no config)
 *   - false: Frontend explicitly disables B2B
 */
export function checkB2BFrontendConfig() {
  try {
    const frontendOverride = getConfigValue('commerce-companies-enabled');

    if (frontendOverride === false) {
      // eslint-disable-next-line no-console
      console.log('B2B company is disabled in frontend configuration');
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Could not check frontend B2B override:', error);
    return true; // Default to enabled on error
  }
}

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
