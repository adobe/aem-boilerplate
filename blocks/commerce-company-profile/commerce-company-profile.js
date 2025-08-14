import { CompanyProfile } from '@dropins/storefront-company-management/containers/CompanyProfile.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';
import { checkIsCompanyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
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

  // Render company profile if authenticated, company functionality is enabled,
  // and customer has a company
  await companyRenderer.render(CompanyProfile, {})(block);
}
