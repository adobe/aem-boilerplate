import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_FORGOTPASSWORD_PATH, checkIsAuthenticated } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    })(block);
  }
}
