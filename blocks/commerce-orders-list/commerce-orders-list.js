import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { OrdersList } from '@dropins/storefront-account/containers/OrdersList.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  checkIsAuthenticated,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  CUSTOMER_RETURN_DETAILS_PATH,
  UPS_TRACKING_URL,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const { 'minified-view': minifiedViewConfig = 'false' } = readBlockConfig(block);
  const getProductLink = (productData) => (productData?.product ? rootLink(`/products/${productData.product.urlKey}/${productData.product.sku}`) : rootLink('#'));

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await accountRenderer.render(OrdersList, {
      minifiedView: minifiedViewConfig === 'true',
      routeTracking: ({ carrier, number }) => {
        if (carrier === 'ups') {
          return `${UPS_TRACKING_URL}?tracknum=${number}`;
        }
        return '';
      },
      routeOrdersList: () => rootLink(CUSTOMER_ORDERS_PATH),
      routeOrderDetails: (orderNumber) => rootLink(`${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderNumber}`),
      routeReturnDetails: ({ orderNumber, returnNumber }) => rootLink(`${CUSTOMER_RETURN_DETAILS_PATH}?orderRef=${orderNumber}&returnRef=${returnNumber}`),
      routeOrderProduct: getProductLink,
      slots: {
        OrderItemImage: (ctx) => {
          const { data, defaultImageProps } = ctx;
          const anchor = document.createElement('a');
          anchor.href = getProductLink(ctx.data);

          tryRenderAemAssetsImage(ctx, {
            alias: data.product.sku,
            imageProps: defaultImageProps,
            wrapper: anchor,

            params: {
              width: defaultImageProps.width,
              height: defaultImageProps.height,
            },
          });
        },
      },
    })(block);
  }
}
