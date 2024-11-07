/* eslint-disable import/prefer-default-export */
import * as authApi from '@dropins/storefront-auth/api.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { events } from '@dropins/tools/event-bus.js';
import { getCookie } from '../../scripts/configs.js';
import { CUSTOMER_FORGOTPASSWORD_PATH } from '../../scripts/constants.js';

function checkAndRedirect(checkUrl, redirectUrl) {
  // If the user is on the dashboard page and initiates logout,
  // they will be redirected to the login page.
  const currentUrl = window.location.pathname;

  if (currentUrl.includes(checkUrl)) {
    window.location.href = `${window.location.origin}${redirectUrl}`;
  }
}

function renderSignIn(element) {
  authRenderer.render(SignIn, {
    onSuccessCallback: () => {},
    formSize: 'small',
    routeForgotPassword: () => CUSTOMER_FORGOTPASSWORD_PATH,
  })(element);
}

export function renderAuthDropdown(navTools) {
  const dropdownElement = document.createRange().createContextualFragment(`
 <div class="dropdown-wrapper nav-tools-wrapper">
    <button type="button" class="nav-dropdown-button"></button>
    <div class="nav-auth-menu-panel nav-tools-panel">
      <div id="auth-dropin-container"></div>
      <ul class="authenticated-user-menu">
         <li><a href="/customer/account">My Account</a></li>
          <li>
            <a href="/products/hollister-backyard-sweatshirt/MH05">Product page</a>
          </li>
          <li><button>Logout</button></li>
      </ul>
    </div>
 </div>`);

  navTools.append(dropdownElement);

  const authDropDownPanel = navTools.querySelector('.nav-auth-menu-panel');
  const authDropDownMenuList = navTools.querySelector('.authenticated-user-menu');
  const authDropinContainer = navTools.querySelector('#auth-dropin-container');
  const loginButton = navTools.querySelector('.nav-dropdown-button');
  const logoutButtonElement = navTools.querySelector('.authenticated-user-menu > li > button');

  authDropDownPanel.addEventListener('click', (e) => e.stopPropagation());

  async function toggleDropDownAuthMenu(state) {
    const show = state ?? !authDropDownPanel.classList.contains('nav-tools-panel--show');

    authDropDownPanel.classList.toggle('nav-tools-panel--show', show);
  }

  loginButton.addEventListener('click', () => toggleDropDownAuthMenu());
  document.addEventListener('click', async (e) => {
    const clickOnDropDownPanel = authDropDownPanel.contains(e.target);
    const clickOnLoginButton = loginButton.contains(e.target);

    if (!clickOnDropDownPanel && !clickOnLoginButton) {
      await toggleDropDownAuthMenu(false);
    }
  });

  logoutButtonElement.addEventListener('click', async () => {
    await authApi.revokeCustomerToken();
    checkAndRedirect('/customer', '/customer/login');
  });

  renderSignIn(authDropinContainer);

  const updateDropDownUI = (isAuthenticated) => {
    const getUserTokenCookie = getCookie('auth_dropin_user_token');
    const getUserNameCookie = getCookie('auth_dropin_firstname');

    if (isAuthenticated || getUserTokenCookie) {
      authDropDownMenuList.style.display = 'block';
      authDropinContainer.style.display = 'none';
      loginButton.textContent = `Hi, ${getUserNameCookie}`;
    } else {
      authDropDownMenuList.style.display = 'none';
      authDropinContainer.style.display = 'block';
      loginButton.innerHTML = `
      <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          >
          <g fill="none" stroke="#000000" stroke-width="1.5">
          <circle cx="12" cy="6" r="4"></circle>
          <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></path></g></svg>
        `;
    }
  };

  events.on('authenticated', (isAuthenticated) => {
    updateDropDownUI(isAuthenticated);
  });

  updateDropDownUI();
}
