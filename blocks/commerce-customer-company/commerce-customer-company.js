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
import { CustomerCompanyInfo } from '@dropins/storefront-company-management/containers/CustomerCompanyInfo.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { checkIsCompanyEnabled } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Check if company functionality is enabled
  const companyCheck = await checkIsCompanyEnabled();
  if (companyCheck.companyEnabled) {
    await companyRenderer.render(CustomerCompanyInfo, {})(block);
  }
}
