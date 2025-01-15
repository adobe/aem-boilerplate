/* eslint-disable import/no-cycle */
import { getConfigValue } from './configs.js';
import { getUserTokenCookie } from './initializers/index.js';
import { getConsent } from './scripts.js';

async function initAnalytics() {
  // Load Commerce events SDK and collector
  if (getConsent('commerce-collection')) {
    const config = {
      environmentId: await getConfigValue('commerce.headers.cs.Magento-Environment-Id'),
      environment: await getConfigValue('commerce-environment'),
      storeUrl: await getConfigValue('commerce-store-url'),
      websiteId: parseInt(await getConfigValue('commerce-website-id'), 10),
      websiteCode: await getConfigValue('commerce.headers.cs.Magento-Website-Code'),
      storeId: parseInt(await getConfigValue('commerce-store-id'), 10),
      storeCode: await getConfigValue('commerce.headers.cs.Magento-Store-Code'),
      storeViewId: parseInt(await getConfigValue('commerce-store-view-id'), 10),
      storeViewCode: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
      websiteName: await getConfigValue('commerce-website-name'),
      storeName: await getConfigValue('commerce-store-name'),
      storeViewName: await getConfigValue('commerce-store-view-name'),
      baseCurrencyCode: await getConfigValue('commerce-base-currency-code'),
      storeViewCurrencyCode: await getConfigValue('commerce-base-currency-code'),
      storefrontTemplate: 'EDS',
    };

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
}

if (document.prerendering) {
  document.addEventListener('prerenderingchange', initAnalytics, {
    once: true,
  });
} else {
  initAnalytics();
}

// add delayed functionality here
