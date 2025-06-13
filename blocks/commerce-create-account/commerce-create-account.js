import { SignUp } from '@dropins/storefront-auth/containers/SignUp.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { checkIsAuthenticated } from '../../scripts/commerce.js';
import {
  authPrivacyPolicyConsentSlot,
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_LOGIN_PATH,
} from '../../scripts/constants.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignUp, {
      hideCloseBtnOnEmailConfirmation: true,
      routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
      routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
      slots: {
        ...authPrivacyPolicyConsentSlot,
      },
    })(block);
  }
}
