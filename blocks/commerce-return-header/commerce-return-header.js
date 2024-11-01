/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';
import { CUSTOMER_RETURN_DETAILS_PATH, CUSTOMER_RETURNS_PATH } from '../../scripts/constants.js';

// TODO - Will be refactored during implementation of return-details page
// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await uiProvider.render(Header, { title: 'Return' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_RETURN_DETAILS_PATH)) {
    const link = document.createElement('a');

    // TODO: Add i18n when appropriate functionality will be introduced in boilerplate
    link.innerText = '< Back to all returns';
    link.href = CUSTOMER_RETURNS_PATH;
    link.classList.add('returns-list-header');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  // TODO - Will be refactored during implementation of return-details page
  events.on('order/data', (orderData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnNumber = urlParams.get('returnRef');
    const returnData = orderData.returns.find((item) => item.returnNumber === returnNumber);
    uiProvider.render(Header, { title: `Return ${returnData.returnNumber}` })(headerContainer);
  }, { eager: true });
}
