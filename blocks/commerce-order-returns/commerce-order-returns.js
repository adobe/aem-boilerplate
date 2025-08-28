import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderReturns } from '@dropins/storefront-order/containers/OrderReturns.js';
import {
  CUSTOMER_RETURN_DETAILS_PATH,
  RETURN_DETAILS_PATH,
  UPS_TRACKING_URL,
  checkIsAuthenticated,
  rootLink,
  getProductLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  const isAuthenticated = checkIsAuthenticated();
  const returnDetailsPath = isAuthenticated
    ? CUSTOMER_RETURN_DETAILS_PATH
    : RETURN_DETAILS_PATH;

  await orderRenderer.render(OrderReturns, {
    slots: {
      ReturnListImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
    },
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

      return rootLink(`${returnDetailsPath}?orderRef=${encodedOrderRef}&returnRef=${returnNumber}`);
    },
    routeProductDetails: (productData) => (productData?.product ? getProductLink(productData.product.urlKey, productData.product.sku) : rootLink('#')),
  })(block);
}
