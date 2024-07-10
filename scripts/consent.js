/**
 * Display Consent Banner and return consent details
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
function displayConsentBanner(consentBanner) {
  const bannerClose = new Promise((resolve) => {
    const dialog = document.createElement('dialog');

    const storeAndClose = (status) => {
      localStorage.setItem('consentStatus', status);
      dialog.remove();
      resolve(status);
      // eslint-disable-next-line no-use-before-define
      displayConsentLink(consentBanner);
    };

    const close = () => { storeAndClose('declineAll'); };
    const accept = () => { storeAndClose('acceptAll'); };
    const decline = () => { storeAndClose('declineAll'); };

    const config = consentBanner.dataset;
    dialog.id = 'consent-banner';
    dialog.append(consentBanner);
    const buttons = document.createElement('span');
    buttons.className = 'consent-banner-buttons';
    if (config.accept) buttons.append(createButton(config.accept, accept));
    if (config.decline) buttons.append(createButton(config.decline, decline, 'secondary'));
    if (config.close) buttons.append(createButton('\u2715', close, 'consent-banner-close', config.close));
    dialog.append(buttons);
    document.body.append(dialog);
    dialog.show();
  });

  return bannerClose;
}

/* display consent link */
function displayConsentLink(consentBanner) {
  const div = document.createElement('div');
  div.id = 'consent-link';
  const button = createButton(consentBanner.dataset.shortTitle, async () => {
    div.remove();
    await displayConsentBanner(consentBanner);
  }, 'secondary');
  div.append(button);
  document.body.append(div);
}

/* main consent handler */
export default async function handleConsent() {
  const mapStatus = (consentStatus) => {
    if (consentStatus === 'declineAll') return false;
    return true;
  };
  const consentStatus = localStorage.getItem('consentStatus');
  const consentBanner = (await loadFragment('/drafts/uncled/consent-banner')).firstElementChild;

  if (consentStatus === null) {
    return mapStatus(await displayConsentBanner(consentBanner));
  }
  displayConsentLink(consentBanner);
  return mapStatus(consentStatus);
}
