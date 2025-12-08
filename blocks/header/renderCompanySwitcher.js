import { render } from '@dropins/storefront-company-switcher/render.js';
import { CompanySwitcher } from '@dropins/storefront-company-switcher/containers/CompanySwitcher.js';
import '../../scripts/initializers/company-switcher.js';
import {
  CUSTOMER_NEGOTIABLE_QUOTE_PATH,
  CUSTOMER_NEGOTIABLE_QUOTE_TEMPLATE_PATH,
  CUSTOMER_ORDERS_PATH,
  CUSTOMER_PO_LIST_PATH,
  rootLink,
} from '../../scripts/commerce.js';

// Redirection rules:
const redirections = {
  '/customer/order-details?orderRef=': rootLink(CUSTOMER_ORDERS_PATH),
  '/customer/purchase-order-details?poRef=': rootLink(CUSTOMER_PO_LIST_PATH),
  '/customer/negotiable-quote?quoteid=': rootLink(CUSTOMER_NEGOTIABLE_QUOTE_PATH),
  '/customer/negotiable-quote-template?quoteTemplateId=': rootLink(CUSTOMER_NEGOTIABLE_QUOTE_TEMPLATE_PATH),
};

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
      const redirect = Object.entries(redirections).find(([pattern]) => {
        const [pathname, search] = pattern.split('?');
        return window.location.pathname.includes(pathname)
          && (!search || window.location.search.includes(search));
      });

      if (redirect) {
        const [, redirectUrl] = redirect;
        window.location.href = redirectUrl;
      } else {
        window.location.reload();
      }
    },
  })(companySwitcherElement);

  return {
    companySwitcherElement,
  };
}
