// MarTech: replace placeholders for each new landing-page project.
export const envConfig = {
  prod: {
    datastreamId: 'REPLACE_WITH_PRODUCTION_DATASTREAM_ID',
    orgId: 'REPLACE_WITH_IMS_ORG_ID',
    launchUrl: 'REPLACE_WITH_PRODUCTION_LAUNCH_URL',
    oneTrustDomainId: 'REPLACE_WITH_PRODUCTION_ONETRUST_DOMAIN_ID',
  },
  nonProd: {
    datastreamId: 'REPLACE_WITH_NONPRODUCTION_DATASTREAM_ID',
    orgId: 'REPLACE_WITH_IMS_ORG_ID',
    launchUrl: 'REPLACE_WITH_NONPRODUCTION_LAUNCH_URL',
    oneTrustDomainId: 'REPLACE_WITH_NONPRODUCTION_ONETRUST_DOMAIN_ID',
  },
};

export const productionHosts = [];

// MarTech: map the actual OneTrust category IDs; banner readiness is not consent.
export const oneTrustCategories = {
  collect: 'REPLACE_WITH_ANALYTICS_CATEGORY_ID',
  marketing: 'REPLACE_WITH_MARKETING_CATEGORY_ID',
  personalize: 'REPLACE_WITH_PERSONALIZATION_CATEGORY_ID',
  share: 'REPLACE_WITH_SHARING_CATEGORY_ID',
};

export function getRuntimeConfig(hostname = window.location.hostname) {
  if (hostname.endsWith('.aem.page')) return envConfig.nonProd;
  const isProduction = /^main--[^.]+--[^.]+\.aem\.live$/.test(hostname)
    || productionHosts.includes(hostname);
  return envConfig[isProduction ? 'prod' : 'nonProd'];
}

export function isConfigured(value) {
  return typeof value === 'string' && value.trim() !== '' && !value.startsWith('REPLACE_WITH_');
}

export function validateMartechConfig(config) {
  if (!Object.values(config).every(isConfigured)
    || !Object.values(oneTrustCategories).every(isConfigured)) {
    throw new Error('MarTech is inactive: replace the placeholders in scripts/env-config.js.');
  }
  if (!/^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/i.test(config.datastreamId)
    || !/^[\da-f]{24}@AdobeOrg$/i.test(config.orgId)
    || !/^https:\/\/assets\.adobedtm\.com\/[\w/-]+\.min\.js$/.test(config.launchUrl)
    || !/^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}(-test)?$/i.test(config.oneTrustDomainId)) {
    throw new Error('MarTech is inactive: invalid Datastream, IMS Org, Launch URL or OneTrust ID.');
  }
}
