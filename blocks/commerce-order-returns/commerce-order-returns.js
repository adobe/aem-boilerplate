/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderReturns } from '@dropins/storefront-order/containers/OrderReturns.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import {
  CUSTOMER_RETURN_DETAILS_PATH,
  RETURN_DETAILS_PATH,
  UPS_TRACKING_URL,
} from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  const isAuthenticated = checkIsAuthenticated();
  const returnDetailsPath = isAuthenticated
    ? CUSTOMER_RETURN_DETAILS_PATH
    : RETURN_DETAILS_PATH;

  await orderRenderer.render(OrderReturns, {
    routeTracking: ({ carrier, number }) => {
      if (carrier?.toLowerCase() === 'ups') {
        return `${UPS_TRACKING_URL}?tracknum=${number}`;
      }
      return '';
    },
    routeReturnDetails: ({ orderNumber, returnNumber, token }) => {
      const { searchParams } = new URL(window.location.href);
      const orderRefFromUrl = searchParams.get('orderRef');
      const newOrderRef = isAuthenticated ? orderNumber : token;

      const encodedOrderRef = encodeURIComponent(orderRefFromUrl || newOrderRef);

      return `${returnDetailsPath}?orderRef=${encodedOrderRef}&returnRef=${returnNumber}`;
    },
    routeProductDetails: (productData) => (productData ? `/products/${productData.product.urlKey}/${productData.product.sku}` : '#'),
  })(block);
}
