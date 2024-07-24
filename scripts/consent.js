/**
 * Handles consent, including the loading of consented.js
 * where needed.
 *
 * Dispatches `consent` event on document on change
 */

// eslint-disable-next-line import/no-cycle
import { loadFragment } from '../blocks/fragment/fragment.js';

/* create button helper */
function createButton(text, clickHandler, style, label) {
  const button = document.createElement('button');
  button.textContent = text;
  if (style) button.className = style;
  if (label) button.ariaLabel = label;
  button.addEventListener('click', clickHandler);
  return button;
}

/* display consent banner */
export async function displayConsentBanner(focus = false) {
  const consentBanner = (await loadFragment('/drafts/uncled/consent-banner')).firstElementChild;

  const bannerClose = new Promise((resolve) => {
    const config = consentBanner.dataset;
    const dialog = document.createElement('dialog');
    dialog.id = 'consent-banner';
    dialog.ariaLabel = config.shortTitle;
    dialog.ariaModal = false;
    dialog.open = true;
    dialog.append(consentBanner);

    const storeAndClose = (status) => {
      localStorage.setItem('consentStatus', status);
      dialog.remove();
      resolve(status);
      document.dispatchEvent(new CustomEvent('consent', { detail: { consentStatus: status } }));
      const loc = window.location;
      if (loc.hash === '#consent') window.history.pushState({}, null, `${loc.pathname}${loc.search}`);
    };

    const close = () => { storeAndClose('declineAll'); };
    const accept = () => { storeAndClose('acceptAll'); };
    const decline = () => { storeAndClose('declineAll'); };

    const buttons = document.createElement('span');
    buttons.className = 'consent-banner-buttons';
    if (config.accept) buttons.append(createButton(config.accept, accept));
    if (config.decline) buttons.append(createButton(config.decline, decline, 'secondary'));
    if (config.close) buttons.append(createButton('\u2715', close, 'consent-banner-close', config.close));
    dialog.append(buttons);
    document.body.append(dialog);
    if (focus) dialog.querySelector('button').focus();
  });

  return bannerClose;
}

/* main consent handler */
export default async function handleConsent() {
  const mapStatus = (consentStatus) => !(consentStatus === 'declineAll');

  document.addEventListener('consent', (e) => {
    if (mapStatus(e.detail.consentStatus)) import('./consented.js');
  });

  window.addEventListener('hashchange', (e) => {
    if (new URL(e.newURL).hash === '#consent') {
      displayConsentBanner(true);
    }
  });

  const consentStatus = localStorage.getItem('consentStatus');
  if (consentStatus === null || window.location.hash === '#consent') {
    return mapStatus(await displayConsentBanner());
  }

  return mapStatus(consentStatus);
}
