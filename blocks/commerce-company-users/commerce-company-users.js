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
import { CompanyUsers } from '@dropins/storefront-company-management/containers/CompanyUsers.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { companyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Check if company functionality is enabled
  const isCompanyEnabled = await companyEnabled();
  if (!isCompanyEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // All checks passed, render the company users block
  await companyRenderer.render(CompanyUsers, {})(block);
}
