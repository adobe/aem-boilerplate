/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';
import { CUSTOMER_RETURN_DETAILS_PATH, CUSTOMER_RETURNS_PATH } from '../../scripts/constants.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await uiProvider.render(Header, { title: 'Return' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_RETURN_DETAILS_PATH)) {
    const placeholders = await fetchPlaceholders();

    const link = document.createElement('a');

    link.innerText = placeholders?.Custom?.CommerceReturnHeader?.backToAllReturns;
    link.href = rootLink(CUSTOMER_RETURNS_PATH);
    link.classList.add('returns-list-header');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  events.on('order/data', (orderData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnNumber = urlParams.get('returnRef');
    const returnData = orderData.returns.find((item) => item.returnNumber === returnNumber);
    uiProvider.render(Header, { title: `Return ${returnData.returnNumber}` })(headerContainer);
  }, { eager: true });
}
