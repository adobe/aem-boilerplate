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

/* eslint-disable import/no-unresolved */
import { AcceptInvitation } from '@dropins/storefront-company-management/containers/AcceptInvitation.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import {
  CUSTOMER_LOGIN_PATH, CUSTOMER_ACCOUNT_PATH, rootLink, checkIsAuthenticated,
} from '../../scripts/commerce.js';

// Initialize company dropin
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  const isAuthenticated = checkIsAuthenticated();

  await companyRenderer.render(AcceptInvitation, {
    routeMyAccount: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    routeLogin: () => rootLink(CUSTOMER_LOGIN_PATH),
    isAuthenticated,
  })(block);
}
