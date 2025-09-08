import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { CompanyRegistration } from '@dropins/storefront-company-management/containers/CompanyRegistration.js';
import { isCompanyUser } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  authPrivacyPolicyConsentSlot,
  rootLink,
} from '../../scripts/commerce.js';
import {
  shouldShowCompanyRegistrationLink,
} from '../../scripts/commerce-b2b.js';
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  try {
    const canShowSignUp = await shouldShowCompanyRegistrationLink();

    if (!canShowSignUp) {
      if (checkIsAuthenticated()) {
        window.location.replace(rootLink(CUSTOMER_ACCOUNT_PATH));
      } else {
        window.location.replace(rootLink(CUSTOMER_LOGIN_PATH));
      }
      return;
    }
  } catch (error) {
    console.error('Error checking B2B status, redirecting to homepage:', error);
    window.location.replace(rootLink(CUSTOMER_LOGIN_PATH));
    return;
  }

  if (checkIsAuthenticated()) {
    try {
      const belongsToCompany = await isCompanyUser();
      if (belongsToCompany) {
        window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
        return;
      }
      // Authenticated but non-company user, show registration form
    } catch (error) {
      console.error('Error checking company membership:', error);
      // On error, allow registration
    }
  }

  // Not authenticated or authenticated non-company user, show registration form
  await companyRenderer.render(CompanyRegistration, {
    hideCloseBtnOnEmailConfirmation: true,
    slots: {
      ...authPrivacyPolicyConsentSlot,
    },
  })(block);
}
