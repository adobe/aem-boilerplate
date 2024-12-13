/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { Button, provider as UI } from '@dropins/tools/components.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_ACCOUNT_PATH, CUSTOMER_FORGOTPASSWORD_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = CUSTOMER_ACCOUNT_PATH;
  } else {
    await authRenderer.render(SignIn, {
      enableEmailConfirmation: true,
      routeForgotPassword: () => CUSTOMER_FORGOTPASSWORD_PATH,
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

                UI.render(Button, {
                  children: 'My Account',

                  onClick: () => {
                    window.location.href = CUSTOMER_ACCOUNT_PATH;
                  },
                })(primaryBtn);

                innerCtx.appendChild(primaryBtn);

                const secondaryButton = document.createElement('div');
                secondaryButton.style.display = 'flex';
                secondaryButton.style.justifyContent = 'center';
                secondaryButton.style.marginTop = 'var(--spacing-xsmall)';

                UI.render(Button, {
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
