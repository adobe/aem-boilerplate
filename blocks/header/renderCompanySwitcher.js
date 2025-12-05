import { render } from '@dropins/storefront-company-switcher/render.js';
import { CompanySwitcher } from '@dropins/storefront-company-switcher/containers/CompanySwitcher.js';
import '../../scripts/initializers/company-switcher.js';

/**
 * Renders the Company Switcher directly inline in the header navigation tools
 * @param {Element} navTools - The navigation tools container element
 */
export default async function renderCompanySwitcher(navTools) {
  const companySwitcherContainer = document.createRange().createContextualFragment(`
    <div class="company-switcher-wrapper nav-tools-wrapper">
      <div class="company-switcher-inline"></div>
    </div>
  `);

  navTools.append(companySwitcherContainer);

  const companySwitcherElement = navTools.querySelector('.company-switcher-inline');

  await render.render(CompanySwitcher, {
    onCompanyChange: () => {
      // first remove any query params from the url
      window.history.replaceState({}, '', window.location.pathname);
      // reload page
      window.location.reload();
    },
  })(companySwitcherElement);

  return {
    companySwitcherElement,
  };
}

