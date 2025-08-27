import { render as provider } from '../../scripts/__dropins__/storefront-company-management/render.js';
import { CompanyStructure } from '../../scripts/__dropins__/storefront-company-management/containers/CompanyStructure.js';
import { checkIsAuthenticated, rootLink } from '../../scripts/commerce.js';
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-b2b-company-structure-container');

  const isAuthenticated = checkIsAuthenticated();

  await provider.render(CompanyStructure, {
    isAuthenticated,
    onCreateCompanyAccount: () => { window.location.href = rootLink('/customer/company/create'); },
  })(block);
}
