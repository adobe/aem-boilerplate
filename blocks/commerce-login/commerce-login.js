/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_FORGOTPASSWORD_PATH, CUSTOMER_ACCOUNT_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = CUSTOMER_ACCOUNT_PATH;
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => CUSTOMER_FORGOTPASSWORD_PATH,
      routeRedirectOnSignIn: () => CUSTOMER_ACCOUNT_PATH,
    })(block);
  }
}
