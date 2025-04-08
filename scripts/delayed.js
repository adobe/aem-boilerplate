/* eslint-disable import/no-cycle */
import { getConfigValue } from './configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent, getRootPath } from './scripts.js';

async function initAnalytics() {
  try {
    // Load Commerce events SDK and collector
    if (getConsent('commerce-collection')) {
      const root = getRootPath();

      const config = await fetch(`${root}analytics-config.json`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then(async ({ data }) => {
          const getValue = (key) => {
            const value = data.find((item) => item.key === key)?.value;
            return value;
          };

          return {
            environmentId: await getConfigValue('commerce.headers.cs.Magento-Environment-Id'),
            environment: getValue('commerce-environment'),
            storeUrl: getValue('commerce-store-url'),
            websiteId: parseInt(getValue('commerce-website-id'), 10),
            websiteCode: await getConfigValue('commerce.headers.cs.Magento-Website-Code'),
            storeId: parseInt(getValue('commerce-store-id'), 10),
            storeCode: await getConfigValue('commerce.headers.cs.Magento-Store-Code'),
            storeViewId: parseInt(getValue('commerce-store-view-id'), 10),
            storeViewCode: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
            websiteName: getValue('commerce-website-name'),
            storeName: getValue('commerce-store-name'),
            storeViewName: getValue('commerce-store-view-name'),
            baseCurrencyCode: getValue('commerce-base-currency-code'),
            storeViewCurrencyCode: getValue('commerce-base-currency-code'),
            storefrontTemplate: 'EDS',
          };
        });

      window.adobeDataLayer.push(
        { storefrontInstanceContext: config },
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
