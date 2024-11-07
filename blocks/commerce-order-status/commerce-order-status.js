/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderStatus } from '@dropins/storefront-order/containers/OrderStatus.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderStatus, {
    routeCreateReturn: (orderData) => (checkIsAuthenticated() ? `/customer/create-return?orderId=${orderData.id}` : `/create-return?orderId=${orderData.id}`),
    routeOnSuccess: () => '/cart',
  })(block);
}
