import { CompanyStructure } from '@dropins/storefront-company-management/containers/CompanyStructure.js';
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

  const companyCheck = await checkIsCompanyEnabled();
  if (!companyCheck.companyEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  try {
    await getCompany();
  } catch (error) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  await companyRenderer.render(CompanyStructure, {})(block);
}
