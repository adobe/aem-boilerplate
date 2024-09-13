/* eslint-disable implicit-arrow-linebreak */
// TODO - This module supposed to add link to authCombine container for demo purposes
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { Button } from '@dropins/tools/components.js';
import { getCookie } from '../../scripts/configs.js';

const signInFormConfig = {
  renderSignUpLink: true,
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
};

const signUpFormConfig = {
  routeSignIn: () => '/customer/login',
  routeRedirectOnSignIn: () => '/customer/account',
  isAutoSignInEnabled: false,
  slots: {
    SuccessNotification: (ctx) => {
      const elem = document.createElement('div');

      authRenderer.render(SuccessNotification, {
        labels: {
          headingText: 'Your account has been successfully created!',
          messageText: 'You can login using sign-in page now.',
        },
        slots: {
          SuccessNotificationActions: (innerCtx) => {
            const primaryBtn = document.createElement('div');

            authRenderer.render(Button, {
              children: 'Sign in',

              onClick: () => {
                window.location.href = '/customer/login';
              },
            })(primaryBtn);

            innerCtx.appendChild(primaryBtn);

            const secondaryButton = document.createElement('div');
            secondaryButton.style.display = 'flex';
            secondaryButton.style.justifyContent = 'center';
            secondaryButton.style.marginTop = 'var(--spacing-xsmall)';

            authRenderer.render(Button, {
              children: 'Home',
              variant: 'tertiary',
              onClick: () => {
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
};

const resetPasswordFormConfig = {
  routeSignIn: () => '/customer/login',
};

const onHeaderLinkClick = () => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const originalViewportContent = viewportMeta.getAttribute('content');

  if (getCookie('auth_dropin_firstname')) {
    window.location.href = '/customer/account';
    return;
  }
  const signInModal = document.createElement('div');
  document.body.style.overflow = 'hidden';
  viewportMeta.setAttribute(
    'content',
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  );

  signInModal.setAttribute('id', 'auth-combine-modal');
  signInModal.classList.add('auth-combine-modal-overlay');

  const closeModalWindow = (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && event.target.nodeName === 'BODY') {
      signInModal.remove();
    }
  };

  window.addEventListener('keydown', closeModalWindow);

  signInModal.onclick = () => {
    signInModal.remove();
    document.body.style.overflow = 'auto';
    viewportMeta.setAttribute('content', originalViewportContent);
  };

  const signInForm = document.createElement('div');
  signInForm.setAttribute('id', 'auth-combine-wrapper');
  signInForm.onclick = (event) => {
    event.stopPropagation();
  };

  signInModal.appendChild(signInForm);
  document.body.appendChild(signInModal);

  authRenderer.render(AuthCombine, {
    signInFormConfig,
    signUpFormConfig,
    resetPasswordFormConfig,
  })(signInForm);
};

const renderAuthCombine = (navSections) => {
  if (getCookie('auth_dropin_firstname')) return;

  const navListEl = navSections.querySelector('.default-content-wrapper > ul');

  const test = document.createElement('li');
  test.classList.add('authCombineNavElement');
  test.innerText = 'Combined Auth';
  test.addEventListener('click', () => {
    onHeaderLinkClick();

    function getPopupElements() {
      const headerBlock = document.querySelector('.header.block');
      const headerLoginButton = document.querySelector('#header-login-button');
      const popupElement = document.querySelector('#popup-menu');
      const popupMenuContainer = document.querySelector('.popupMenuContainer');

      return {
        headerBlock,
        headerLoginButton,
        popupElement,
        popupMenuContainer,
      };
    }

    events.on('authenticated', (isAuthenticated) => {
      const authCombineNavElement = document.querySelector('.authCombineNavElement');
      if (isAuthenticated) {
        const { headerLoginButton, popupElement, popupMenuContainer } = getPopupElements();

        if (!authCombineNavElement || !headerLoginButton || !popupElement || !popupMenuContainer) {
          return;
        }

        authCombineNavElement.style.display = 'none';
        popupMenuContainer.innerHTML = '';
        popupElement.style.minWidth = '250px';
        if (headerLoginButton) {
          const spanElementText = headerLoginButton.querySelector('span');
          spanElementText.textContent = `Hi, ${getCookie('auth_dropin_firstname')}`;
        }
        popupMenuContainer.insertAdjacentHTML(
          'afterend',
          `<ul class="popupMenuUrlList">
              <li><a href="/customer/account">My Account</a></li>
              <li><a href="/products/hollister-backyard-sweatshirt/MH05">Product page</a></li>
              <li><button class="logoutButton">Logout</button></li>
            </ul>`,
        );
      }
    });
  });

  navListEl.appendChild(test);
};

export default renderAuthCombine;
