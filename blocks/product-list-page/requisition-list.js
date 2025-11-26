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
 * Requisition List functionality for Product List Page
 * This module handles all requisition list related features including
 * rendering the requisition list selector for products in list/search results.
 */

import { render as rlRenderer } from '@dropins/storefront-requisition-list/render.js';
import {
  RequisitionListSelector,
} from '@dropins/storefront-requisition-list/containers/RequisitionListSelector.js';
import { events } from '@dropins/tools/event-bus.js';
import { checkIsAuthenticated, rootLink } from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/requisition-list.js';

/**
 * Creates the render function for requisition list selector in product lists
 * @param {Object} labels - Placeholder labels for i18n
 * @returns {Function} Render function for requisition list selector
 */
function createRequisitionListRenderer(labels) {
  return async function renderRequisitionListSelectorIfEnabled($container, product) {
    const isAuthenticated = checkIsAuthenticated();
    if (!isAuthenticated) {
      $container.innerHTML = '';
      return;
    }
    // Render RequisitionListSelector with beforeAddProdToReqList validation if B2B is enabled
    rlRenderer.render(RequisitionListSelector, {
      sku: product.sku,
      quantity: 1,
      beforeAddProdToReqList: () => {
        const url = rootLink(`/products/${product.urlKey}/${product.sku}`.toLowerCase());
        if (product.typename !== 'SimpleProductView') {
          sessionStorage.setItem('requisitionListRedirect', JSON.stringify({
            message: labels.Global?.SelectProductOptionsBeforeRequisition || 'Please select product options before adding it to a requisition list',
          }));
          window.location.href = url;
          throw new Error('Redirecting to product page');
        }
      },
    })($container);
  };
}

/**
 * Creates the requisition list action element for a product in the list
 * @param {Object} params - Configuration parameters
 * @param {Function} params.renderFunction - The render function for requisition list selector
 * @param {Object} params.product - Product data
 * @param {Function} params.onAuthenticated - Callback to setup authentication event handler
 * @returns {HTMLElement} The requisition list container element
 */
async function createRequisitionListAction({
  renderFunction,
  product,
  onAuthenticated,
}) {
  const $reqListContainer = document.createElement('div');
  $reqListContainer.classList.add('product-discovery-product-actions__requisition-list-names');

  // Initial render
  await renderFunction($reqListContainer, product);

  // Setup authentication event handler callback
  if (onAuthenticated) {
    onAuthenticated($reqListContainer, product);
  }

  return $reqListContainer;
}

/**
 * Initialize requisition list functionality on the product details page
 * @param {Object} params - Configuration parameters
 * @param {Object} params.product - Product data
 * @param {Object} params.labels - Placeholder labels
 */
export async function initializeRequisitionList({
  product,
  labels,
}) {
  // Create the render function
  const renderFunction = createRequisitionListRenderer(labels);

  return createRequisitionListAction({
    renderFunction,
    product,
    onAuthenticated: ($container) => {
      events.on('authenticated', async () => {
        await renderFunction($container, product);
      });
    },
  });
}
