import { getCookie } from '@dropins/tools/lib.js';
import { events } from '@dropins/tools/event-bus.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { checkIsAuthenticated, rootLink } from '../../scripts/commerce.js';

const ADMIN_SESSION_COOKIE = 'auth_dropin_admin_session';

/**
 * Creates and manages banner for Seller Assisted Buying sessions
 * @returns {HTMLElement|null} The banner element or null if not in admin session
 */
export default async function renderSellerAssistedBuyingBanner() {
  if (!checkIsAuthenticated()) {
    return null;
  }

  const isAdminSession = getCookie(ADMIN_SESSION_COOKIE);

  if (!isAdminSession) {
    return null;
  }

  let websiteName = '';
  const authStoreConfig = sessionStorage.getItem('storeConfig');

  if (authStoreConfig) {
    try {
      websiteName = JSON.parse(authStoreConfig).websiteName ?? '';
    } catch (error) {
      console.warn('Failed to parse storeConfig from sessionStorage:', error);
      sessionStorage.removeItem('storeConfig');
    }
  }

  if (!websiteName) {
    try {
      const storeConfig = await authApi.getStoreConfig();
      websiteName = storeConfig?.websiteName ?? '';
      if (storeConfig) {
        sessionStorage.setItem('storeConfig', JSON.stringify(storeConfig));
      }
    } catch (error) {
      console.warn('Failed to fetch storeConfig:', error);
    }
  }

  const customerFirstname = getCookie('auth_dropin_firstname') ?? '';
  const customerLastname = getCookie('auth_dropin_lastname') ?? '';

  // Create banner element
  const banner = document.createElement('div');
  banner.className = 'seller-assisted-buying-banner';

  // Create message section
  const message = document.createElement('div');
  message.className = 'seller-assisted-buying-banner__message';

  const customerName = document.createElement('strong');
  customerName.textContent = `${customerFirstname} ${customerLastname}`;
  message.append('You are connected as ', customerName, ` on ${websiteName}`);

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'seller-assisted-buying-banner__close-button';
  closeButton.type = 'button';
  const closeButtonTextEl = document.createElement('span');
  closeButtonTextEl.textContent = 'Close Session';
  closeButton.appendChild(closeButtonTextEl);

  // Handle close session
  closeButton.addEventListener('click', async () => {
    try {
      // Disable button during logout
      closeButton.disabled = true;
      closeButton.textContent = 'Closing...';

      // Use regular logout mutation, banner will be hidden automatically
      await authApi.revokeCustomerToken();

      // Redirect to home page after logout
      window.location.href = rootLink('/');
    } catch (error) {
      console.error('Error closing seller assisted buying session:', error);
      closeButton.disabled = false;
      closeButton.textContent = 'Close Session';
    }
  });

  banner.appendChild(message);
  banner.appendChild(closeButton);

  // Listen to authentication changes to remove banner if session ends
  events.on('authenticated', (isAuthenticated) => {
    if (!isAuthenticated || !getCookie(ADMIN_SESSION_COOKIE)) {
      banner.remove();
    }
  });

  return banner;
}
