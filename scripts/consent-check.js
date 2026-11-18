import { oneTrustCategories } from './env-config.js';

let consentedLoaded = false;
let managerLoaded = false;
let consentResolved = false;
let consent = {
  collect: false, marketing: false, personalize: false, share: false,
};

export function getConsent() {
  return { ...consent };
}

function publishConsent(groups) {
  consentResolved = true;
  const activeGroups = new Set(groups);
  consent = Object.fromEntries(Object.entries(oneTrustCategories)
    .map(([purpose, category]) => [purpose, activeGroups.has(category)]));
  window.dispatchEvent(new CustomEvent('consent.update', {
    detail: { ...consent, consented: consent.collect },
  }));
  if (consent.collect && !consentedLoaded) {
    consentedLoaded = true;
    import('./consented.js').catch((error) => {
      // eslint-disable-next-line no-console
      console.error('MarTech: consented scripts failed to load', error);
    });
  }
}

// MarTech: OneTrust fires this on initial category resolution and subsequent changes.
window.addEventListener('OneTrustGroupsUpdated', ({ detail }) => {
  if (!Array.isArray(detail) || !detail.every((group) => typeof group === 'string')) {
    // eslint-disable-next-line no-console
    console.error('MarTech: OneTrustGroupsUpdated must contain an array of category IDs.');
    return;
  }
  publishConsent(detail);
});

function waitForConsent() {
  if (consentResolved) return Promise.resolve();
  return new Promise((resolve) => {
    let timeout;
    const onReady = () => {
      window.clearTimeout(timeout);
      window.removeEventListener('consent.update', onReady);
      resolve();
    };
    // MarTech: bound CMP startup; never wait for the visitor to dismiss the banner.
    timeout = window.setTimeout(onReady, 1000);
    window.addEventListener('consent.update', onReady, { once: true });
  });
}

export function loadConsentManager(domainId) {
  const groups = window.OnetrustActiveGroups ?? window.OptanonActiveGroups;
  if (typeof groups === 'string') publishConsent(groups.split(',').filter(Boolean));
  const ready = waitForConsent();
  if (managerLoaded || window.OneTrust) return ready;
  managerLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
  script.async = true;
  script.dataset.domainScript = domainId;
  script.dataset.documentLanguage = 'true';
  script.onerror = () => {
    // eslint-disable-next-line no-console
    console.error('MarTech: OneTrust failed to load; consent remains denied.');
  };
  document.head.append(script);
  return ready;
}
