// TODO: Update/remove commented code when company signup dropin is ready
// eslint-disable-next-line import/no-unresolved
import { render as companyRenderer } from '@dropins/company-signup/render.js';
// eslint-disable-next-line import/no-unresolved
import { CompanySignUp } from '@dropins/company-signup/containers/CompanySignUp.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  authPrivacyPolicyConsentSlot,
  rootLink,
} from '../../scripts/commerce.js';
import {
  shouldShowCompanySignUpLink,
} from '../../scripts/commerce-b2b.js';

// Initialize
// import '../../scripts/initializers/company-signup.js';

export default async function decorate(block) {
  try {
    const canShowSignUp = await shouldShowCompanySignUpLink();

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

  // Placeholder for actual company signup dropin
  block.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Company Registration</h2>
    </div>
  `;

  // Render the company signup dropin
  await companyRenderer.render(CompanySignUp, {
    hideCloseBtnOnEmailConfirmation: true,
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    slots: {
      ...authPrivacyPolicyConsentSlot,
    },
  })(block);
}
