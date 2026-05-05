import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderComments } from '@dropins/storefront-order/containers/OrderComments.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderComments, {})(block);
}
