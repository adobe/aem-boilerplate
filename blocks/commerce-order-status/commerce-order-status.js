/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderStatus } from '@dropins/storefront-order/containers/OrderStatus.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CREATE_RETURN_PATH, CUSTOMER_CREATE_RETURN_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/order.js';
import { rootLink } from '../../scripts/scripts.js';

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
