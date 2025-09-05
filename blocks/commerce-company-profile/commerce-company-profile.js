import { CompanyProfile } from '@dropins/storefront-company-management/containers/CompanyProfile.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { checkIsAuthenticated, checkIsCompanyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { CUSTOMER_LOGIN_PATH, CUSTOMER_ACCOUNT_PATH, rootLink } from '../../scripts/commerce.js';

export default async function decorate(block) {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Check if company functionality is enabled
  const companyCheck = await checkIsCompanyEnabled();
  if (!companyCheck.companyEnabled) {
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

  // All checks passed, render the company profile
  await companyRenderer.render(CompanyProfile, {})(block);
}
