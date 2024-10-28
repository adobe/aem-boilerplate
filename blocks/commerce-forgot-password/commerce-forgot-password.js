/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { ResetPassword } from '@dropins/storefront-auth/containers/ResetPassword.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_LOGIN_PATH, CUSTOMER_ACCOUNT_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = CUSTOMER_ACCOUNT_PATH;
  } else {
    await authRenderer.render(ResetPassword, {
      routeSignIn: () => CUSTOMER_LOGIN_PATH,
    })(block);
  }

  events.on('authenticated', (authenticated) => {
    if (authenticated) window.location.href = CUSTOMER_ACCOUNT_PATH;
  });
}
