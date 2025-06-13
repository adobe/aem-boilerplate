import { ResetPassword } from '@dropins/storefront-auth/containers/ResetPassword.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { events } from '@dropins/tools/event-bus.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_LOGIN_PATH, checkIsAuthenticated } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(ResetPassword, {
      routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    })(block);
  }

  events.on('authenticated', (authenticated) => {
    if (authenticated) window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  });
}
