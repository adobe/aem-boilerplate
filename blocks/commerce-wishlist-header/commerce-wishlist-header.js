/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';
import {
  CUSTOMER_WISHLIST_PATH,
} from '../../scripts/constants.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await uiProvider.render(Header, { title: 'Wishlist' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_WISHLIST_PATH)) {
    const placeholders = await fetchPlaceholders('wishlist');

    const link = document.createElement('a');

    // link.innerText = placeholders?.Custom?.CommerceReturnHeader?.backToAllReturns;
    link.innerText = 'Wishlist items';
    link.href = rootLink(CUSTOMER_WISHLIST_PATH);
    link.classList.add('wishlist-list-header');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  // events ?
  events.on('wishlist/data', (data) => {
  }, { eager: true });
}
