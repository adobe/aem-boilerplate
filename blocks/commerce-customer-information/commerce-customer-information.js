import CustomerInformation from '@dropins/storefront-account/containers/CustomerInformation.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await accountRenderer.render(CustomerInformation, {})(block);
  }
}
