/* eslint-disable import/no-cycle */
import { getConfigValue } from './configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './scripts.js';

async function initAnalytics() {
  try {
    // Load Commerce events SDK and collector
    // only if "analytics" has been added to the config.
    const config = getConfigValue('analytics');

    if (config && getConsent('commerce-collection')) {
      const csHeaders = getConfigValue('headers.cs');

      window.adobeDataLayer.push(
        {
          storefrontInstanceContext: {
            baseCurrencyCode: config['base-currency-code'],
            environment: config.environment,
            environmentId: csHeaders['Magento-Environment-Id'],
            storeCode: csHeaders['Magento-Store-Code'],
            storefrontTemplate: 'EDS',
            storeId: parseInt(config['store-id'], 10),
            storeName: config['store-name'],
            storeUrl: config['store-url'],
            storeViewCode: csHeaders['Magento-Store-View-Code'],
            storeViewCurrencyCode: config['base-currency-code'],
            storeViewId: parseInt(config['store-view-id'], 10),
            storeViewName: config['store-view-name'],
            websiteCode: csHeaders['Magento-Website-Code'],
            websiteId: parseInt(config['website-id'], 10),
            websiteName: config['website-name'],
          },
        },
        { eventForwardingContext: { commerce: true, aep: false } },
        {
          shopperContext: {
            shopperId: getUserTokenCookie() ? 'logged-in' : 'guest',
          },
        },
      );

      // Load events SDK and collector
      import('./commerce-events-sdk.js');
      import('./commerce-events-collector.js');
    }
  } catch (error) {
    console.warn('Error initializing analytics', error);
  }
}

if (document.prerendering) {
  document.addEventListener('prerenderingchange', initAnalytics, { once: true });
} else {
  initAnalytics();
}

// add delayed functionality here
