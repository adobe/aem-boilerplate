/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';
import { CUSTOMER_ORDER_DETAILS_PATH, CUSTOMER_ORDERS_PATH } from '../../scripts/constants.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await uiProvider.render(Header, { title: 'Order' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_ORDER_DETAILS_PATH)) {
    const link = document.createElement('a');

    // TODO: Add i18n when appropriate functionality will be introduced in boilerplate
    link.innerText = '< Back to all orders';
    link.href = CUSTOMER_ORDERS_PATH;
    link.classList.add('orders-list-link');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on('order/data', (orderData) => {
    uiProvider.render(Header, { title: `Order ${orderData.number}` })(headerContainer);
  }, { eager: true });
}
