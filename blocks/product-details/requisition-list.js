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

import { Icon, InLineAlert, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { events } from '@dropins/tools/event-bus.js';
import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import {
  RequisitionListSelector,
} from '@dropins/storefront-requisition-list/containers/RequisitionListSelector.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { checkIsAuthenticated } from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/requisition-list.js';

/**
 * Creates the render function for requisition list selector
 * @param {Object} configValues - Product configuration values
 * @param {Object} params - Configuration parameters
 * @param {HTMLElement} params.$alert - Alert container element
 * @param {Object} params.product - Product data
 * @param {Object} params.labels - Placeholder labels
 * @returns {Function} Render function for requisition list selector
 */
function createRequisitionListRenderer(configValues, {
  $alert,
  product,
  labels,
}) {
  let inlineAlert = null;

  return async function renderRequisitionListSelectorIfEnabled($container, currentOptions = null) {
    const isAuthenticated = checkIsAuthenticated();
    if (!isAuthenticated) {
      $container.innerHTML = '';
      return null;
    }

    // Render RequisitionListSelector with beforeAddProdToReqList validation if B2B is enabled
    return rlRenderer.render(RequisitionListSelector, {
      sku: product.sku,
      quantity: configValues?.quantity || 1,
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
  };
}

/**
 * Sets up requisition list event handlers
 * @param {Object} configValues - Product configuration values
 * @param {Object} params - Configuration parameters
 * @param {Function} params.renderFunction - The render function for requisition list names
 * @param {HTMLElement} params.$requisitionListSelector - Container element for requisition list
 * @param {URLSearchParams} params.urlParams - URL search parameters
 */
function setupRequisitionListEventHandlers(configValues, {
  renderFunction,
  $requisitionListSelector,
  urlParams,
}) {
  // Handle option changes
  events.on('pdp/values', async () => {
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
      $requisitionListSelector,
      optionUIDs,
    );
  }, { eager: true });

  // Handle authentication state changes (login/logout)
  // Using { eager: true } to also catch the initial state on page load
  events.on('authenticated', async () => {
    // Get current selected options when rendering for authenticated user
    const urlOptionsUIDs = urlParams.get('optionsUIDs');
    const optionUIDs = urlOptionsUIDs === '' ? null : (configValues?.optionsUIDs || null);
    // Render requisition list for authenticated user
    await renderFunction(
      $requisitionListSelector,
      optionUIDs,
    );
  }, { eager: true });
}

/**
 * Shows redirect notification if user was redirected from requisition list
 * @param {HTMLElement} $alert - Alert container element
 */
function showRequisitionListRedirectNotification($alert) {
  let redirectNotification = null;

  // Check if user was redirected from requisition list (sessionStorage)
  const redirectData = sessionStorage.getItem('requisitionListRedirect');
  if (redirectData) {
    try {
      const {
        timestamp,
        message,
      } = JSON.parse(redirectData);

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
 * @param {HTMLElement} params.$requisitionListSelector - Container element for requisition list
 * @param {Object} params.product - Product data
 * @param {Object} params.labels - Placeholder labels
 * @param {URLSearchParams} params.urlParams - URL search parameters
 */
export async function initializeRequisitionList({
  $alert,
  $requisitionListSelector,
  product,
  labels,
  urlParams,
}) {
  // Create the render function
  const configValues = pdpApi.getProductConfigurationValues();
  const renderFunction = createRequisitionListRenderer(configValues, {
    $alert,
    product,
    labels,
  });

  // Setup event handlers
  setupRequisitionListEventHandlers(configValues, {
    renderFunction,
    $requisitionListSelector,
    urlParams,
  });

  // Perform initial render based on current state
  const urlOptionsUIDs = urlParams.get('optionsUIDs');
  const optionUIDs = urlOptionsUIDs === '' ? null : (configValues?.optionsUIDs || null);
  await renderFunction($requisitionListSelector, optionUIDs);

  // Show redirect notification if applicable
  showRequisitionListRedirectNotification($alert);
}
