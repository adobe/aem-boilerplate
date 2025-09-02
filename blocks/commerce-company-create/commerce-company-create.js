import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { CompanyRegistration } from '@dropins/storefront-company-management/containers/CompanyRegistration.js';
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
      window.location.replace(rootLink('/'));
      return;
    }
  } catch (error) {
    console.error('⚠️ Error checking B2B status, redirecting to homepage:', error);
    window.location.replace(rootLink('/'));
    return;
  }

  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  await companyRenderer.render(CompanyRegistration, {
    hideCloseBtnOnEmailConfirmation: true,
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    slots: {
      ...authPrivacyPolicyConsentSlot,
    },
  })(block);
}
