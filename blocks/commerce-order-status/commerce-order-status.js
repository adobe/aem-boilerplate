import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderStatus } from '@dropins/storefront-order/containers/OrderStatus.js';
import {
  CREATE_RETURN_PATH,
  CUSTOMER_CREATE_RETURN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderStatus, {
    routeCreateReturn: ({ token, number: orderNumber }) => {
      const isAuthenticated = checkIsAuthenticated();

      const { searchParams } = new URL(window.location.href);
      const orderRefFromUrl = searchParams.get('orderRef');
      const newOrderRef = isAuthenticated ? orderNumber : token;

      const encodedOrderRef = encodeURIComponent(orderRefFromUrl || newOrderRef);

      return checkIsAuthenticated() ? rootLink(`${CUSTOMER_CREATE_RETURN_PATH}?orderRef=${encodedOrderRef}`) : rootLink(`${CREATE_RETURN_PATH}?orderRef=${encodedOrderRef}`);
    },
    routeOnSuccess: () => rootLink('/cart'),
  })(block);
}
