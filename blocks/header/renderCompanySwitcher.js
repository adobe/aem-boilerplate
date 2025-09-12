import { render } from '@dropins/storefront-company-switcher/render.js';
import { CompanySwitcher } from '@dropins/storefront-company-switcher/containers/CompanySwitcher.js';
import '../../scripts/initializers/company-switcher.js';

/**
 * Renders the Company Switcher directly inline in the header navigation tools
 * @param {Element} navTools - The navigation tools container element
 */
export default function renderCompanySwitcher(navTools) {
  const companySwitcherContainer = document.createRange().createContextualFragment(`
    <div class="company-switcher-wrapper nav-tools-wrapper">
      <div class="company-switcher-inline"></div>
    </div>
  `);

  navTools.append(companySwitcherContainer);

  const companySwitcherElement = navTools.querySelector('.company-switcher-inline');

  render.render(CompanySwitcher, {})(companySwitcherElement);

  return {
    companySwitcherElement,
  };
}
