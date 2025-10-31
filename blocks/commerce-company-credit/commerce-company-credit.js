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
import { CompanyCredit } from '@dropins/storefront-company-management/containers/CompanyCredit.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { companyEnabled, checkCompanyCreditEnabled } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';
import { readBlockConfig } from '../../scripts/aem.js';

// Initialize
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  const { 'show-history': showHistory = 'true' } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }
  // Check if company functionality is enabled
  const companyCheck = await companyEnabled();
  if (!companyCheck) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // Check if company credit is enabled
  const companyCreditCheck = await checkCompanyCreditEnabled();
  if (!companyCreditCheck) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // All checks passed, render company credit container
  const shouldShowHistory = showHistory === 'true';

  await companyRenderer.render(CompanyCredit, {
    showCreditHistory: shouldShowHistory,
    creditHistoryParams: shouldShowHistory ? {
      pageSize: 20,
      currentPage: 1,
    } : undefined,
  })(block);
}
