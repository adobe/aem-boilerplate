/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

/**
 * Requisition List functionality for Product Details Page
 * This module handles all requisition list related features including
 * rendering the requisition list component, event handling, and notifications.
 */

import {
  InLineAlert,
  Icon,
  provider as UI,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { events } from '@dropins/tools/event-bus.js';
import * as rlApi from '@dropins/storefront-requisition-list/api.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import { RequisitionListSelector } from '@dropins/storefront-requisition-list/containers/RequisitionListSelector.js';
import { companyEnabled } from '@dropins/storefront-company-management/api.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { checkIsAuthenticated } from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/requisition-list.js';

/**
 * Checks if requisition list feature is fully enabled
 * Requires both B2B (company) and requisition list to be enabled
 * @returns {Promise<boolean>} True if feature is enabled
 */
export async function isRequisitionListFeatureEnabled() {
  try {
    const isB2BEnabled = await companyEnabled();
    const isRequisitionListEnabled = await rlApi.isRequisitionListEnabled();
    return isB2BEnabled && isRequisitionListEnabled;
  } catch (error) {
    console.error('Error checking requisition list feature status:', error);
    return false;
  }
}

/**
 * Creates the render function for requisition list selector
 * @param {Object} params - Configuration parameters
 * @param {HTMLElement} params.$alert - Alert container element
 * @param {Object} params.product - Product data
 * @param {Object} params.labels - Placeholder labels
 * @returns {Function} Render function for requisition list selector
 */
export function createRequisitionListRenderer({ $alert, product, labels }) {
  let inlineAlert = null;

  return async function renderRequisitionListSelectorIfEnabled($container, currentOptions = null) {
    const isAuthenticated = checkIsAuthenticated();
    if (!isAuthenticated) {
      $container.innerHTML = '';
      return null;
    }

    // Check if both B2B and requisition list are enabled
    const isEnabled = await isRequisitionListFeatureEnabled();

    if (isEnabled) {
      const reqLists = (await rlApi.getRequisitionLists()).items;
      const configValues = pdpApi.getProductConfigurationValues();

      // Render RequisitionListSelector with beforeAddProdToReqList validation
      return rlRenderer.render(RequisitionListSelector, {
        items: reqLists,
        canCreate: true,
        sku: product.sku,
        quantity: configValues?.quantity || 1,
        variant: 'neutral',
        selectedOptions: currentOptions,
        beforeAddProdToReqList: async () => {
          // Check if product has options and if they are selected
          const productHasOptions = product?.options && product.options.length > 0;
          const isArray = Array.isArray(currentOptions);
          const arrayLength = isArray ? currentOptions.length : 0;
          const hasSelectedOptions = currentOptions != null && (isArray ? arrayLength > 0 : true);
          const needsOptionSelection = productHasOptions && !hasSelectedOptions;

          if (needsOptionSelection) {
            // Show inline alert
            if (inlineAlert) {
              inlineAlert.remove();
            }

            inlineAlert = await UI.render(InLineAlert, {
              heading: labels.Global?.SelectProductOptionsBeforeRequisition || 'Please select product options',
              description: labels.Global?.SelectProductOptionsBeforeRequisitionDescription || 'Please select all required product options before adding to a requisition list.',
              icon: h(Icon, { source: 'Warning' }),
              type: 'warning',
              variant: 'secondary',
              'aria-live': 'assertive',
              role: 'alert',
              onDismiss: () => {
                if (inlineAlert) {
                  inlineAlert.remove();
                }
              },
            })($alert);

            // Scroll the alert into view
            setTimeout(() => {
              $alert.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }, 100);

            // Throw error to prevent modal from opening
            throw new Error('Product options must be selected');
          }
        },
      })($container);
    }
    $container.innerHTML = '';
    return null;
  };
}

/**
 * Sets up requisition list event handlers
 * @param {Object} params - Configuration parameters
 * @param {Function} params.renderFunction - The render function for requisition list names
 * @param {HTMLElement} params.$requisitionListNames - Container element for requisition list
 * @param {URLSearchParams} params.urlParams - URL search parameters
 */
export function setupRequisitionListEventHandlers({
  renderFunction,
  $requisitionListNames,
  urlParams,
}) {
  // Handle option changes
  events.on('pdp/values', async () => {
    const configValues = pdpApi.getProductConfigurationValues();

    // Check URL parameter for empty optionsUIDs
    const urlOptionsUIDs = urlParams.get('optionsUIDs');

    // Get optionsUIDs - prioritize actual selected values from configValues
    let optionUIDs = null;
    // First priority: actual selected options from configValues
    const hasConfigOptions = configValues?.optionsUIDs
      && Array.isArray(configValues.optionsUIDs)
      && configValues.optionsUIDs.length > 0;

    if (hasConfigOptions) {
      optionUIDs = configValues.optionsUIDs;
    } else if (urlOptionsUIDs === '') {
      // Second priority: URL has explicit empty optionsUIDs parameter
      optionUIDs = null;
    }

    // Re-render requisition list component with updated options
    await renderFunction(
      $requisitionListNames,
      optionUIDs,
    );
  }, { eager: true });

  // Handle authentication state changes (login/logout)
  // Using { eager: true } to also catch the initial state on page load
  events.on('authenticated', async () => {
    // Get current selected options when rendering for authenticated user
    const configValues = pdpApi.getProductConfigurationValues();
    const urlOptionsUIDs = urlParams.get('optionsUIDs');
    const optionUIDs = urlOptionsUIDs === '' ? null : (configValues?.optionsUIDs || null);
    // Render requisition list for authenticated user
    await renderFunction(
      $requisitionListNames,
      optionUIDs,
    );
  }, { eager: true });
}

/**
 * Shows redirect notification if user was redirected from requisition list
 * @param {HTMLElement} $alert - Alert container element
 */
export function showRequisitionListRedirectNotification($alert) {
  let redirectNotification = null;

  // Check if user was redirected from requisition list (sessionStorage)
  const redirectData = sessionStorage.getItem('requisitionListRedirect');
  if (redirectData) {
    try {
      const { timestamp, message } = JSON.parse(redirectData);

      // Only show notification if redirect happened within last 5 seconds
      // This prevents showing stale notifications
      const isRecent = Date.now() - timestamp < 5000;

      if (isRecent && message) {
        const showRedirectNotification = async () => {
          redirectNotification = await UI.render(InLineAlert, {
            heading: message,
            type: 'warning',
            variant: 'secondary',
            icon: h(Icon, { source: 'Warning' }),
            'aria-live': 'polite',
            role: 'alert',
            onDismiss: () => {
              redirectNotification?.remove();
            },
          })($alert);

          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            redirectNotification?.remove();
          }, 5000);
        };

        // Show notification after a brief delay to ensure DOM is ready
        setTimeout(showRedirectNotification, 100);
      }
    } catch (e) {
      console.error('Failed to parse requisition list redirect data:', e);
    } finally {
      // Always clean up sessionStorage
      sessionStorage.removeItem('requisitionListRedirect');
    }
  }
}

/**
 * Initialize requisition list functionality on the product details page
 * @param {Object} params - Configuration parameters
 * @param {HTMLElement} params.$alert - Alert container element
 * @param {HTMLElement} params.$requisitionListNames - Container element for requisition list
 * @param {Object} params.product - Product data
 * @param {Object} params.labels - Placeholder labels
 * @param {URLSearchParams} params.urlParams - URL search parameters
 */
export async function initializeRequisitionList({
  $alert,
  $requisitionListNames,
  product,
  labels,
  urlParams,
}) {
  // Create the render function
  const renderFunction = createRequisitionListRenderer({
    $alert,
    product,
    labels,
  });

  // Setup event handlers
  setupRequisitionListEventHandlers({
    renderFunction,
    $requisitionListNames,
    urlParams,
  });

  // Perform initial render based on current state
  const configValues = pdpApi.getProductConfigurationValues();
  const urlOptionsUIDs = urlParams.get('optionsUIDs');
  const optionUIDs = urlOptionsUIDs === '' ? null : (configValues?.optionsUIDs || null);
  await renderFunction($requisitionListNames, optionUIDs);

  // Show redirect notification if applicable
  showRequisitionListRedirectNotification($alert);
}
