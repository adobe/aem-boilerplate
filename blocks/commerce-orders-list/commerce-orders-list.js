/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { OrdersList } from '@dropins/storefront-account/containers/OrdersList.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { checkIsAuthenticated } from '../../scripts/configs.js';
import { CUSTOMER_LOGIN_PATH, CUSTOMER_ORDER_DETAILS_PATH, CUSTOMER_ORDERS_PATH } from '../../scripts/constants.js';

// Initialize
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const { 'minified-view': minifiedViewConfig = 'false' } = readBlockConfig(block);

  if (!checkIsAuthenticated()) {
    window.location.href = CUSTOMER_LOGIN_PATH;
  } else {
    await accountRenderer.render(OrdersList, {
      minifiedView: minifiedViewConfig === 'true',
      routeOrdersList: () => CUSTOMER_ORDERS_PATH,
      routeOrderDetails: (orderNumber) => `${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderNumber}`,
      slots: {
        // OrdersListCard: (ctx) => {
        //   console.log('OrdersListCard', ctx);
        // },
        // OrdersListAction: (ctx) => {
        //   console.log('OrdersListAction', ctx);
        // },
      },
    })(block);
  }
}
