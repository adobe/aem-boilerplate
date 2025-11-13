import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as UI } from '@dropins/tools/components.js';
import {
  CUSTOMER_PO_DETAILS_PATH,
  CUSTOMER_PO_LIST_PATH,
  fetchPlaceholders,
  rootLink,
} from '../../scripts/commerce.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  const headerContainer = document.createElement('div');
  const headerTitleText = placeholders?.Global?.CommercePOHeader?.poHeaderTitle || 'Purchase order';
  await UI.render(Header, { title: headerTitleText })(headerContainer);

  if (window.location.href.includes(CUSTOMER_PO_DETAILS_PATH)) {
    const link = document.createElement('a');

    link.innerText = placeholders?.Global?.CommercePOHeader?.backToAllPOs || '< Back to all purchase orders';
    link.href = rootLink(CUSTOMER_PO_LIST_PATH);
    link.classList.add('po-list-link');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on(
    'purchase-order/data',
    (poData) => {
      UI.render(Header, { title: `${headerTitleText} ${poData.number}` })(
        headerContainer,
      );
    },
    { eager: true },
  );
}
