/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { CreateReturn } from '@dropins/storefront-order/containers/CreateReturn.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { ORDER_DETAILS_PATH, CUSTOMER_ORDER_DETAILS_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(CreateReturn, {
    routeReturnSuccess: (orderData) => (checkIsAuthenticated() ? `${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderData.number}` : `${ORDER_DETAILS_PATH}?orderRef=${orderData.token}`),
  })(block);
}
