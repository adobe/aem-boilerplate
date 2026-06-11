import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { SellerAssistedBuyingActivity } from '@dropins/storefront-account/containers/SellerAssistedBuyingActivity.js';
import { CUSTOMER_LOGIN_PATH, checkIsAuthenticated, rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    const container = document.createElement('div');
    await accountRenderer.render(SellerAssistedBuyingActivity, {
      withWrapper: false,
    })(container);
    block.appendChild(container);
  }
}
