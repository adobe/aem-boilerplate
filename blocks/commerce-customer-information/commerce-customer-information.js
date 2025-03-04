/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import CustomerInformation from '@dropins/storefront-account/containers/CustomerInformation.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_LOGIN_PATH } from '../../scripts/constants.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await accountRenderer.render(CustomerInformation, {})(block);
  }
}
