import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './commerce.js';

async function initAnalytics() {
  try {
    // Load Commerce events SDK and collector
    // only if "analytics" has been added to the config.
    const analyticsConfig = getConfigValue('analytics');

    if (analyticsConfig && getConsent('commerce-collection')) {
      window.adobeDataLayer.push(
        {
          storefrontInstanceContext: {
            baseCurrencyCode: analyticsConfig['base-currency-code'],
            environment: analyticsConfig.environment,
            environmentId: analyticsConfig['environment-id'],
            storeCode: analyticsConfig['store-code'],
            storefrontTemplate: 'EDS',
            storeId: parseInt(analyticsConfig['store-id'], 10),
            storeName: analyticsConfig['store-name'],
            storeUrl: analyticsConfig['store-url'],
            storeViewCode: analyticsConfig['store-view-code'],
            storeViewCurrencyCode: analyticsConfig['base-currency-code'],
            storeViewId: parseInt(analyticsConfig['store-view-id'], 10),
            storeViewName: analyticsConfig['store-view-name'],
            websiteCode: analyticsConfig['website-code'],
            websiteId: parseInt(analyticsConfig['website-id'], 10),
            websiteName: analyticsConfig['website-name'],
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
