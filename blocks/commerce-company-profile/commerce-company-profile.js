import { CompanyProfile } from '@dropins/storefront-company-management/containers/CompanyProfile.js';
import { render as companyRenderer } from '@dropins/storefront-company-management/render.js';

// Initialize
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  // All validation is handled in the initializer
  // Just render the company profile
  await companyRenderer.render(CompanyProfile, {})(block);
}
