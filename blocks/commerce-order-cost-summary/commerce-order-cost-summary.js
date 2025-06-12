import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderCostSummary } from '@dropins/storefront-order/containers/OrderCostSummary.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderCostSummary, {})(block);
}
