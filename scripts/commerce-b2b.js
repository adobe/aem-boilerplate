/**
 * B2B Commerce Configuration Utilities
 */

import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';

/**
 * Constants
 */
export const COMPANY_CREATE_PATH = '/customer/company/create';


/**
 * Check frontend configuration (commerce-companies-enabled) for B2B override
 * @returns {boolean}
 *   - true: Frontend enables B2B (explicit true OR no config)
 *   - false: Frontend explicitly disables B2B
 */
export function checkB2BFrontendConfig() {
  try {
    const frontendOverride = getConfigValue('commerce-companies-enabled');

    if (frontendOverride === false) {
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Could not check frontend B2B override:', error);
    return true; // Default to enabled on error
  }
}


/**
 * Check if company registration navigation link should be shown
 * Frontend and backend configs must be evaluated to true
 * @returns {Promise<boolean>} True if company registration link should be displayed
 */
export async function shouldShowCompanyRegistrationLink() {
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

  let backendEnabled = false;
  try {
    const { allowCompanyRegistration } = await import('@dropins/storefront-company-management/api.js');
    backendEnabled = await allowCompanyRegistration();
  } catch (error) {
    // Handle missing dropin or other errors
    if (error.message?.includes('Failed to resolve module') || error.message?.includes('404')) {
      console.info('Company management dropin not available, company registration disabled');
    } else {
      console.warn('Could not check company registration config:', error.message);
    }
    backendEnabled = false;
  }

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
        validator: shouldShowCompanyRegistrationLink,
        cssClass: 'company-registration',
      },
    ];

    const results = {};
    const allLinks = navElement.querySelectorAll('a[href]');

    // Process each B2B link configuration
    const configPromises = b2bLinkConfigs.map(async (config) => {
      const shouldShow = await config.validator();

      // Find links matching this configuration
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
    // Handle missing dropin or other errors
    if (error.message?.includes('Failed to resolve module') || error.message?.includes('404')) {
      console.info('B2B dropin not available, navigation links hidden');
    } else {
      console.warn('B2B navigation logic failed:', error.message);
    }
    
    // Hide all B2B links on error
    const allLinks = navElement.querySelectorAll('a[href]');
    const b2bPaths = [COMPANY_CREATE_PATH];
    
    Array.from(allLinks).forEach((link) => {
      const href = link.getAttribute('href');
      if (b2bPaths.some((path) => href.includes(path))) {
        const parentLi = link.closest('li');
        if (parentLi) {
          parentLi.style.display = 'none';
          parentLi.classList.add('b2b-hidden');
        }
      }
    });
    
    return null;
  }
}
