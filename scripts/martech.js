import { getMetadata } from './aem.js';
import {
  initMartech,
  updateUserConsent,
  martechEager,
  martechLazy,
  martechDelayed,
} from '../plugins/martech/src/index.js';
import { getRuntimeConfig, validateMartechConfig } from './env-config.js';
import { getConsent, loadConsentManager } from './consent-check.js';

let initialized;
let lazyReady = false;
let delayedReady = false;
let lazyPromise;
let launchPromise;
let consent = getConsent();

function reportError(error) {
  // eslint-disable-next-line no-console
  console.error('MarTech integration failed', error);
}

function runConsentedPhases() {
  if (!initialized || !consent.collect) return;
  if (lazyReady && !lazyPromise) {
    lazyPromise = initialized.then(martechLazy);
    lazyPromise.catch(reportError);
  }
  if (delayedReady && lazyPromise && consent.marketing && !launchPromise) {
    launchPromise = lazyPromise.then(() => {
      if (consent.collect && consent.marketing) return martechDelayed();
      launchPromise = undefined;
      return undefined;
    });
    launchPromise.catch(reportError);
  }
}

window.addEventListener('consent.update', () => {
  consent = getConsent();
  if (initialized) {
    updateUserConsent(consent).catch(reportError);
    runConsentedPhases();
  }
});

export async function loadMartechEager() {
  const config = getRuntimeConfig();
  try {
    validateMartechConfig(config);
  } catch (error) {
    reportError(error);
    return;
  }
  const targetEnabled = getMetadata('target').toLowerCase() === 'true';
  const consentReady = loadConsentManager(config.oneTrustDomainId);
  if (targetEnabled) await consentReady;
  consent = getConsent();
  const viewName = `${window.location.hostname}:landing:${window.location.pathname}`;
  // MarTech: only returning, explicitly consented visitors get eager personalization.
  initialized = initMartech({
    datastreamId: config.datastreamId,
    orgId: config.orgId,
    defaultConsent: 'pending',
    onBeforeEventSend: (payload) => {
      if (!consent.collect) return false;
      payload.xdm ||= {};
      payload.xdm.web ||= {};
      payload.xdm.web.webPageDetails = {
        name: document.title,
        ...payload.xdm.web.webPageDetails,
      };
      return true;
    },
  }, {
    personalization: targetEnabled && consent.collect && consent.personalize,
    performanceOptimized: true,
    personalizationTimeout: 2500,
    launchUrls: [config.launchUrl],
    decisionScopes: [viewName],
    xdm: { web: { webPageDetails: { viewName } } },
    shouldProcessEvent: () => consent.collect,
  });
  updateUserConsent(consent).catch(reportError);
  try {
    await initialized;
    await martechEager();
  } catch (error) {
    reportError(error);
  }
}

export function loadMartechLazy() {
  lazyReady = true;
  runConsentedPhases();
}

export function loadMartechDelayed() {
  delayedReady = true;
  runConsentedPhases();
}
