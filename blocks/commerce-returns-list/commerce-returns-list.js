import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import ReturnsList from '@dropins/storefront-order/containers/ReturnsList.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_RETURN_DETAILS_PATH,
  CUSTOMER_RETURNS_PATH,
  UPS_TRACKING_URL,
  checkIsAuthenticated,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  const {
    'minified-view': minifiedViewConfig = 'false',
  } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await orderRenderer.render(ReturnsList, {
      minifiedView: minifiedViewConfig === 'true',
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
      routeReturnDetails: ({ orderNumber, returnNumber }) => rootLink(`${CUSTOMER_RETURN_DETAILS_PATH}?orderRef=${orderNumber}&returnRef=${returnNumber}`),
      routeOrderDetails: ({ orderNumber }) => rootLink(`${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderNumber}`),
      routeReturnsList: () => rootLink(CUSTOMER_RETURNS_PATH),
      routeProductDetails: (productData) => (productData?.product ? rootLink(`/products/${productData.product.urlKey}/${productData.product.sku}`) : rootLink('#')),
    })(block);
  }
}
