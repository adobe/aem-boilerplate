/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderReturns } from '@dropins/storefront-order/containers/OrderReturns.js';

// Initialize
import '../../scripts/initializers/order.js';
import {
  CUSTOMER_RETURN_DETAILS_PATH,
} from '../../scripts/constants.js';

export default async function decorate(block) {
  await orderRenderer.render(OrderReturns, {
    routeReturnDetails: ({ orderNumber, returnNumber }) => `${CUSTOMER_RETURN_DETAILS_PATH}?orderRef=${orderNumber}&returnRef=${returnNumber}`,
    routeProductDetails: (productData) => (productData ? `/products/${productData.product.urlKey}/${productData.product.sku}` : '#'),
  })(block);
}
