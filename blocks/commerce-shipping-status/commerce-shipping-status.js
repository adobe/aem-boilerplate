/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { ShippingStatus } from '@dropins/storefront-order/containers/ShippingStatus.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(ShippingStatus, {
    routeProductDetails: (data) => {
      if (data.orderItem) {
        return `/products/${data.orderItem.productUrlKey}/${data.orderItem.product.sku}`;
      } if (data.product) {
        return `/products/${data.product.urlKey}/${data.product.sku}`;
      }
      return '#';
    },
  })(block);
}
