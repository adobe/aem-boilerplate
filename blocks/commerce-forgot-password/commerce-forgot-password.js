/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { ResetPassword } from '@dropins/storefront-auth/containers/ResetPassword.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { events } from '@dropins/tools/event-bus.js';
import { getCookie } from '../../scripts/configs.js';

export default async function decorate(block) {
  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  if (isAuthenticated) {
    window.location.href = '/customer/account';
  } else {
    await authRenderer.render(ResetPassword, {
      routeSignIn: () => '/customer/login',
    })(block);
  }

  events.on('authenticated', (authenticated) => {
    if (authenticated) window.location.href = '/customer/account';
  });
}
