// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';
import { getConfigValue } from './configs.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// Load Commerce events SDK and collector
const config = {
  environmentId: await getConfigValue('commerce-environment-id'),
  environment: await getConfigValue('commerce-environment'),
  storeUrl: await getConfigValue('commerce-store-url'),
  websiteId: await getConfigValue('commerce-website-id'),
  websiteCode: await getConfigValue('commerce-website-code'),
  storeId: await getConfigValue('commerce-store-id'),
  storeCode: await getConfigValue('commerce-store-code'),
  storeViewId: await getConfigValue('commerce-store-view-id'),
  storeViewCode: await getConfigValue('commerce-store-view-code'),
  websiteName: await getConfigValue('commerce-website-name'),
  storeName: await getConfigValue('commerce-store-name'),
  storeViewName: await getConfigValue('commerce-store-view-name'),
  baseCurrencyCode: await getConfigValue('commerce-base-currency-code'),
  storeViewCurrencyCode: await getConfigValue('commerce-base-currency-code'),
  storefrontTemplate: 'Franklin',
};

window.adobeDataLayer.push(
  { storefrontInstanceContext: config },
  { eventForwardingContext: { commerce: true, aep: false } },
);

// Load events SDK and collector
import('./commerce-events-sdk.js');
import('./commerce-events-collector.js');
