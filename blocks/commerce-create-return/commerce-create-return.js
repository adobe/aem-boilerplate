import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { CreateReturn } from '@dropins/storefront-order/containers/CreateReturn.js';
import { ORDER_DETAILS_PATH, CUSTOMER_ORDER_DETAILS_PATH, checkIsAuthenticated } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(CreateReturn, {
    routeReturnSuccess: (orderData) => {
      const orderRef = checkIsAuthenticated() ? orderData.number : orderData.token;
      const encodedOrderRef = encodeURIComponent(orderRef);
      const path = checkIsAuthenticated() ? CUSTOMER_ORDER_DETAILS_PATH : ORDER_DETAILS_PATH;

      return rootLink(`${path}?orderRef=${encodedOrderRef}`);
    },
  })(block);
}
