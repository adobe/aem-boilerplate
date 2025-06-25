import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { CreateReturn } from '@dropins/storefront-order/containers/CreateReturn.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import {
  ORDER_DETAILS_PATH,
  CUSTOMER_ORDER_DETAILS_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  await orderRenderer.render(CreateReturn, {
    slots: {
      ReturnReasonFormImage: (ctx) => {
        tryRenderAemAssetsImage(ctx, imageSlotConfig(ctx));
      },
      CartSummaryItemImage: (ctx) => {
        tryRenderAemAssetsImage(ctx, imageSlotConfig(ctx));
      },
    },
    routeReturnSuccess: (orderData) => {
      const orderRef = checkIsAuthenticated() ? orderData.number : orderData.token;
      const encodedOrderRef = encodeURIComponent(orderRef);
      const path = checkIsAuthenticated() ? CUSTOMER_ORDER_DETAILS_PATH : ORDER_DETAILS_PATH;

      return rootLink(`${path}?orderRef=${encodedOrderRef}`);
    },
  })(block);
}
function imageSlotConfig(ctx) {
  const { data, defaultImageProps } = ctx;
  return {
    alias: data.product.sku,
    imageProps: defaultImageProps,

    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  };
}
