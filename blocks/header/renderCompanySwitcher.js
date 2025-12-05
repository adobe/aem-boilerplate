import { render } from '@dropins/storefront-company-switcher/render.js';
import { CompanySwitcher } from '@dropins/storefront-company-switcher/containers/CompanySwitcher.js';
import '../../scripts/initializers/company-switcher.js';
import { CUSTOMER_NEGOTIABLE_QUOTE_PATH, CUSTOMER_NEGOTIABLE_QUOTE_TEMPLATE_PATH, rootLink } from '../../scripts/commerce.js';

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
      handleCompanyChange({
        '/customer/negotiable-quote?quoteid=': rootLink(CUSTOMER_NEGOTIABLE_QUOTE_PATH),
        '/customer/negotiable-quote-template?quoteTemplateId=': rootLink(CUSTOMER_NEGOTIABLE_QUOTE_TEMPLATE_PATH),
      });
    },
  })(companySwitcherElement);

  return {
    companySwitcherElement,
  };
}

function handleCompanyChange(redirections) {
  const shouldRedirect = Object.entries(redirections).some(([currentPath, redirectPath]) => {
    const [pathname, search] = currentPath.split('?');
    const pathnameMatches = window.location.pathname.includes(pathname);
    const searchMatches = !search || window.location.search.includes(search);

    if (pathnameMatches && searchMatches) {
      window.location.href = redirectPath;
      return true;
    }
    return false;
  });

  if (!shouldRedirect) {
    // reload the page if no redirect occurred
    window.location.reload();
  }
}
