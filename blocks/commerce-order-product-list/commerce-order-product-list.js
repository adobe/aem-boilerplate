/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderProductList } from '@dropins/storefront-order/containers/OrderProductList.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

// Initialize
import '../../scripts/initializers/order.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderProductList, {
    slots: {
      Footer: (ctx) => {
        const giftOptions = document.createElement('div');

        CartProvider.render(GiftOptions, {
          item: ctx.item,
          view: 'product',
          dataSource: 'order',
          isEditable: false,
        })(giftOptions);

        ctx.appendChild(giftOptions);
      },
    },
    routeProductDetails: (product) => rootLink(`/products/${product.productUrlKey}/${product.product.sku}`),
  })(block);
}
