import { getMetadata } from './aem.js';

/* eslint-disable import/no-cycle */
const ALLOWED_CONFIGS = ['prod', 'stage', 'dev'];

/**
 * This function calculates the environment in which the site is running based on the URL.
 * It defaults to 'prod'. In non 'prod' environments, the value can be overwritten using
 * the 'environment' key in sessionStorage.
 *
 * @returns {string} - environment identifier (dev, stage or prod'.
 */
export const calcEnvironment = () => {
  const { host, href } = window.location;
  let environment = 'prod';
  if (href.includes('.aem.page') || host.includes('staging')) {
    environment = 'stage';
  }
  if (href.includes('localhost')) {
    environment = 'dev';
  }

  const environmentFromConfig = window.sessionStorage.getItem('environment');
  if (
    environmentFromConfig
    && ALLOWED_CONFIGS.includes(environmentFromConfig)
    && environment !== 'prod'
  ) {
    return environmentFromConfig;
  }

  return environment;
};

function buildConfigURL(environment) {
  const env = environment || calcEnvironment();
  let fileName = 'configs.json';
  if (env !== 'prod') {
    fileName = `configs-${env}.json`;
  }
  const configURL = new URL(`${window.location.origin}/${fileName}`);
  return configURL;
}

function applyConfigOverrides(config) {
  // get overrides
  const website = getMetadata('commerce-website');
  const store = getMetadata('commerce-store');
  const storeview = getMetadata('commerce-storeview');

  // add overrides
  const updates = new Map([
    ['commerce.headers.cs.Magento-Website-Code', website],
    ['commerce.headers.cs.Magento-Store-Code', store],
    ['commerce.headers.cs.Magento-Store-View-Code', storeview],
    ['commerce.headers.all.Store', storeview],
  ]);

  // apply updates
  config.data.forEach((item) => {
    const next = updates.get(item.key);
    if (next) {
      item.value = next;
      updates.delete(item.key);
    }
  });

  // add any updates that weren't applied
  updates.forEach((value, key) => {
    if (value) {
      config.data.push({ key, value });
    }
  });

  return config;
}

const getConfigForEnvironment = async (environment) => {
  const env = environment || calcEnvironment();

  try {
    const configJSON = window.sessionStorage.getItem(`config:${env}`);
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (!parsedConfig[':expiry'] || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)) {
      throw new Error('Config expired');
    }

    return applyConfigOverrides(parsedConfig);
  } catch (e) {
    let configJSON = await fetch(buildConfigURL(env));
    if (!configJSON.ok) {
      throw new Error(`Failed to fetch config for ${env}`);
    }
    configJSON = await configJSON.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem(`config:${env}`, JSON.stringify(configJSON));
    return applyConfigOverrides(configJSON);
  }
};

/**
 * This function retrieves a configuration value for a given environment.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @param {string} [environment] - Optional, overwrite the current environment.
 * @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
 */
export const getConfigValue = async (configParam, environment) => {
  const env = environment || calcEnvironment();
  const config = await getConfigForEnvironment(env);
  const configElements = config.data;
  return configElements.find((c) => c.key === configParam)?.value;
};

/**
 * Retrieves headers from config entries like commerce.headers.pdp.my-header, etc and
 * returns as object of all headers like { my-header: value, ... }
 */
export const getHeaders = async (scope, environment) => {
  const env = environment || calcEnvironment();
  const config = await getConfigForEnvironment(env);
  const configElements = config.data.filter((el) => el?.key.includes('headers.all') || el?.key.includes(`headers.${scope}`));

  return configElements.reduce((obj, item) => {
    let { key } = item;

    // global values
    if (key.includes('commerce.headers.all.')) {
      key = key.replace('commerce.headers.all.', '');
    }

    // scoped values
    if (key.includes(`commerce.headers.${scope}.`)) {
      key = key.replace(`commerce.headers.${scope}.`, '');
    }

    return { ...obj, [key]: item.value };
  }, {});
};

export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  let foundValue;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      foundValue = decodeURIComponent(value);
    }
  });

  return foundValue;
};

export const checkIsAuthenticated = () => !!getCookie('auth_dropin_user_token') ?? false;
