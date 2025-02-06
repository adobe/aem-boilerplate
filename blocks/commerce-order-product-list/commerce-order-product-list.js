/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderProductList } from '@dropins/storefront-order/containers/OrderProductList.js';

// Initialize
import '../../scripts/initializers/order.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderProductList, {
    routeProductDetails: (product) => rootLink(`/products/${product.productUrlKey}/${product.product.sku}`),
  })(block);
}
