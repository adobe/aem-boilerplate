/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { Button } from '@dropins/tools/components.js';
import { getCookie } from '../../scripts/configs.js';

export default async function decorate(block) {
  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  if (isAuthenticated) {
    window.location.href = '/customer/account';
  } else {
    await authRenderer.render(SignIn, {
      enableEmailConfirmation: true,
      routeForgotPassword: () => '/customer/forgotpassword',
      slots: {
        SuccessNotification: (ctx) => {
          const userName = ctx?.isSuccessful?.userName || '';

          const elem = document.createElement('div');

          authRenderer.render(SuccessNotification, {
            labels: {
              headingText: `Welcome ${userName}!`,
              messageText: 'You have successfully logged in.',
            },
            slots: {
              SuccessNotificationActions: (innerCtx) => {
                const primaryBtn = document.createElement('div');

                authRenderer.render(Button, {
                  children: 'My Account',

                  onClick: () => {
                    window.location.href = '/customer/account';
                  },
                })(primaryBtn);

                innerCtx.appendChild(primaryBtn);

                const secondaryButton = document.createElement('div');
                secondaryButton.style.display = 'flex';
                secondaryButton.style.justifyContent = 'center';
                secondaryButton.style.marginTop = 'var(--spacing-xsmall)';

                authRenderer.render(Button, {
                  children: 'Logout',
                  variant: 'tertiary',
                  onClick: async () => {
                    await authApi.revokeCustomerToken();
                    window.location.href = '/';
                  },
                })(secondaryButton);

                innerCtx.appendChild(secondaryButton);
              },
            },
          })(elem);

          ctx.appendChild(elem);
        },
      },
    })(block);
  }
}
