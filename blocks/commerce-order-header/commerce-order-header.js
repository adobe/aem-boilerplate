import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as UI } from '@dropins/tools/components.js';
import { CUSTOMER_ORDER_DETAILS_PATH, CUSTOMER_ORDERS_PATH, fetchPlaceholders } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await UI.render(Header, { title: 'Order' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_ORDER_DETAILS_PATH)) {
    const placeholders = await fetchPlaceholders();

    const link = document.createElement('a');

    link.innerText = placeholders?.Global?.CommerceOrderHeader?.backToAllOrders;
    link.href = rootLink(CUSTOMER_ORDERS_PATH);
    link.classList.add('orders-list-link');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on('order/data', (orderData) => {
    UI.render(Header, { title: `Order ${orderData.number}` })(headerContainer);
  }, { eager: true });
}
