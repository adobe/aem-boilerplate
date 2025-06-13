import { getCookie } from '@dropins/tools/lib.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { Button, provider as UI } from '@dropins/tools/components.js';
import {
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  CUSTOMER_LOGIN_PATH,
} from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

const signInFormConfig = {
  renderSignUpLink: true,
  routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
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
                window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
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
                window.location.href = rootLink('/');
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
  routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
  routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
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

            UI.render(Button, {
              children: 'Sign in',

              onClick: () => {
                window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
              },
            })(primaryBtn);

            innerCtx.appendChild(primaryBtn);

            const secondaryButton = document.createElement('div');
            secondaryButton.style.display = 'flex';
            secondaryButton.style.justifyContent = 'center';
            secondaryButton.style.marginTop = 'var(--spacing-xsmall)';

            UI.render(Button, {
              children: 'Home',
              variant: 'tertiary',
              onClick: () => {
                window.location.href = rootLink('/');
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
  routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
};

const onHeaderLinkClick = (element) => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const originalViewportContent = viewportMeta.getAttribute('content');

  if (getCookie('auth_dropin_firstname')) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
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

  const trapFocus = (event) => {
    if (!signInModal) return;

    const key = event.key.toLowerCase();

    if (key === 'escape') {
      event.preventDefault();
      signInModal.click();
      element?.focus();
      window.removeEventListener('keydown', trapFocus);
      return;
    }

    const focusableElements = signInModal.querySelectorAll(
      'input[name="email"], input, button, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!signInModal.dataset.focusInitialized) {
      signInModal.dataset.focusInitialized = 'true';
      requestAnimationFrame(() => firstElement.focus(), 10);
    }

    if (key === 'tab' && event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else if (key === 'tab') {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (document.activeElement === signInModal) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  window.addEventListener('keydown', trapFocus);

  signInModal.onclick = () => {
    signInModal.remove();
    document.body.style.overflow = 'auto';
    viewportMeta.setAttribute('content', originalViewportContent);
    window.removeEventListener('keydown', trapFocus);
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

const renderAuthCombine = (navSections, toggleMenu) => {
  if (getCookie('auth_dropin_firstname')) return;

  const navListEl = navSections.querySelector('.default-content-wrapper > ul');

  const listItems = navListEl.querySelectorAll(
    '.default-content-wrapper > ul > li',
  );

  const accountLi = Array.from(listItems).find((li) => li.textContent.includes('Account'));

  if (accountLi) {
    const accountLiItems = accountLi.querySelectorAll('ul > li');
    const authCombineLink = accountLiItems[accountLiItems.length - 1];

    authCombineLink.classList.add('authCombineNavElement');
    const text = authCombineLink.textContent || '';
    authCombineLink.innerHTML = `<a href="#">${text}</a>`;
    authCombineLink.addEventListener('click', (event) => {
      event.preventDefault();
      onHeaderLinkClick(accountLi);

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
        const authCombineNavElement = document.querySelector(
          '.authCombineNavElement',
        );
        if (isAuthenticated) {
          const { headerLoginButton, popupElement, popupMenuContainer } = getPopupElements();

          if (
            !authCombineNavElement
          || !headerLoginButton
          || !popupElement
          || !popupMenuContainer
          ) {
            return;
          }

          authCombineNavElement.style.display = 'none';
          popupMenuContainer.innerHTML = '';
          popupElement.style.minWidth = '250px';
          if (headerLoginButton) {
            const spanElementText = headerLoginButton.querySelector('span');
            spanElementText.textContent = `Hi, ${getCookie(
              'auth_dropin_firstname',
            )}`;
          }
          popupMenuContainer.insertAdjacentHTML(
            'afterend',
            `<ul class="popupMenuUrlList">
              <li><a href="${rootLink(CUSTOMER_ACCOUNT_PATH)}">My Account</a></li>
              <li><a href="${rootLink('/products/hollister-backyard-sweatshirt/MH05')}">Product page</a></li>
              <li><button class="logoutButton">Logout</button></li>
            </ul>`,
          );
        }
      });
      toggleMenu?.();
    });
  }
};

export default renderAuthCombine;
