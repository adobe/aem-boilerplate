/**
 * B2B Commerce Configuration Utilities
 */

import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';

/**
 * Constants
 */
export const COMPANY_CREATE_PATH = '/customer/company/create';

/**
 * Check if B2B Company module is enabled via GraphQL StoreConfig
 * @returns {Promise<boolean>} True if B2B Company module is enabled
 */
export async function checkB2BCompanyModuleEnabled() {
  try {
    const storeConfigQuery = `
      query GET_COMPANY_MODULE_STATUS {
        storeConfig {
          company_enabled
        }
      }
    `;

    const response = await fetchGraphQl(storeConfigQuery, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (response?.data?.storeConfig?.company_enabled === true) {
      return true;
    }

    return false;
  } catch (error) {
    console.warn('⚠️ Could not check B2B company module status:', error.message);
    return false;
  }
}

/**
 * Check frontend configuration for B2B override
 * @returns {boolean}
 *   - true: Frontend enables B2B (explicit true OR no config)
 *   - false: Frontend explicitly disables B2B
 */
export function checkB2BFrontendConfig() {
  try {
    const frontendOverride = getConfigValue('b2b.enable-company');

    if (frontendOverride === false) {
      return false;
    }
    return true;
  } catch (error) {
    console.warn('⚠️ Could not check frontend B2B override:', error);
    return true; // Default to enabled on error
  }
}

/**
 * Check if company registration is enabled via GraphQL StoreConfig
 * Checks both company_enabled AND allow_company_registration
 * @returns {Promise<boolean>} True if both B2B module and registration are enabled
 */
export async function checkCompanyRegistrationEnabled() {
  try {
    const storeConfigQuery = `
      query GET_COMPANY_REGISTRATION_CONFIG {
        storeConfig {
          company_enabled
          allow_company_registration
        }
      }
    `;

    const response = await fetchGraphQl(storeConfigQuery, {
      method: 'GET',
      cache: 'no-cache',
    });

    const companyEnabled = response?.data?.storeConfig?.company_enabled === true;
    const registrationEnabled = response?.data?.storeConfig?.allow_company_registration === true;

    if (companyEnabled && registrationEnabled) {
      return true;
    }

    return false;
  } catch (error) {
    console.warn('⚠️ Could not check company registration config:', error.message);
    return false;
  }
}

/**
 * Check if company sign-up navigation link should be shown
 * Frontend and backend configs must be evaluated to true
 * @returns {Promise<boolean>} True if company sign-up link should be displayed
 */
export async function shouldShowCompanySignUpLink() {
  const frontendConfig = checkB2BFrontendConfig();

  if (frontendConfig === false) {
    // Emit B2B configuration status event
    const b2bStatus = {
      companyEnabled: false,
      frontendConfig,
      registrationEnabled: false,
      canShowSignUp: false,
    };

    events.emit('b2b/config', b2bStatus);

    return false;
  }

  const backendEnabled = await checkCompanyRegistrationEnabled();

  const shouldShow = frontendConfig && backendEnabled;

  // Emit B2B configuration status event
  const b2bStatus = {
    frontendConfig,
    backendEnabled,
    canShowSignUp: shouldShow,
  };

  events.emit('b2b/config', b2bStatus);

  return shouldShow;
}

/**
 * B2B Navigation Functions
 */

/**
 * Apply B2B navigation logic for all B2B-related links
 * Dynamically hides/shows B2B links based on different validation rules
 * @param {Element} navElement - The navigation element to process
 * @returns {Promise<Object|null>} Status object or null on error
 */
export async function b2bNavigation(navElement) {
  try {
    // Define B2B link configurations with their validation rules
    const b2bLinkConfigs = [
      {
        name: 'companyRegistration',
        paths: [COMPANY_CREATE_PATH],
        validator: shouldShowCompanySignUpLink,
        cssClass: 'company-registration',
      },
    ];

    const results = {};
    const allLinks = navElement.querySelectorAll('a[href]');

    // Process each B2B link configuration
    const configPromises = b2bLinkConfigs.map(async (config) => {
      const shouldShow = await config.validator();
      
      const matchingLinks = Array.from(allLinks).filter((link) => {
        const href = link.getAttribute('href');
        return config.paths.some((path) => href.includes(path));
      });

      // Apply show/hide logic
      matchingLinks.forEach((link) => {
        const parentLi = link.closest('li');
        if (parentLi) {
          if (shouldShow) {
            parentLi.style.display = '';
            parentLi.classList.remove('b2b-hidden');
            parentLi.classList.add(`${config.cssClass}-enabled`);
          } else {
            parentLi.style.display = 'none';
            parentLi.classList.add('b2b-hidden');
            parentLi.classList.remove(`${config.cssClass}-enabled`);
          }
        }
      });

      return {
        name: config.name,
        shouldShow,
        linkCount: matchingLinks.length,
      };
    });

    const configResults = await Promise.all(configPromises);
    configResults.forEach((result) => {
      results[result.name] = {
        shouldShow: result.shouldShow,
        linkCount: result.linkCount,
      };
    });

    // Emit navigation update event
    events.emit('b2b/navigation', {
      action: 'applied',
      results,
      timestamp: Date.now(),
    });

    return results;
  } catch (error) {
    console.warn('⚠️ B2B navigation logic failed:', error);
    return null;
  }
}