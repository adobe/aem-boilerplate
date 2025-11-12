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
import { companyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';

// Containers
import { QuoteTemplatesListTable } from '@dropins/storefront-quote-management/containers/QuoteTemplatesListTable.js';

// Initialize
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/quote-management.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

/**
 * Check if the user has the necessary permissions to access the block
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return false;
  }

  // Check if company functionality is enabled
  const isEnabled = await companyEnabled();
  if (!isEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  return true;
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  // Check if user has permissions to access the block
  const hasPermissions = await checkPermissions();

  // Return early if user doesn't have permissions
  if (!hasPermissions) return;

  // Get the quote id from the url
  const quoteTemplateId = new URLSearchParams(window.location.search).get('quoteTemplateId');

  if (quoteTemplateId) {
    block.classList.add('negotiable-quote-template__details');
    block.setAttribute('data-quote-view', 'details');

    // Render the quote template details view
    console.warn('Quote template ID is not implemented yet');
  } else {
    // Render the quote templates list view
    block.classList.add('negotiable-quote-template__list');
    block.setAttribute('data-quote-view', 'list');

    await negotiableQuoteRenderer.render(QuoteTemplatesListTable, {
      pageSize: 10,
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }
}
