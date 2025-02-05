// Dropin Components
import {
  Button,
  provider as UI,
} from '@dropins/tools/components.js';

// Block-level
import createModal from '../modal/modal.js';
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getConfigValue } from '../../scripts/configs.js';

// Pull Config Values for Store Details 
const storeDetails = {
  storeViewCode: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
  currencyCode: await getConfigValue('commerce-base-currency-code'),
};

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load Footer as Fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');

  // Footer content - Store Switcher
  footer.innerHTML = `
      <div class="storeview-switcher-footer__modal-button"></div>
    `;

  // Container and component refs
  let modal;

  // Modal Actions
  const showModal = async (content) => {
    modal = await createModal([content]);
    modal.showModal();
  };

  // Rendering the Store Switcher Modal Content
  const $storeSwitcherBtn = footer.querySelector(
    '.storeview-switcher-footer__modal-button',
  );

  // Store Switcher Modal Content - Chore: move to different file
  const storeSwitcherPath = '/store-switcher';
  const fragmentStoreView = await loadFragment(storeSwitcherPath);
  const storeSwitcher = document.createElement('div');

  storeSwitcher.id = 'storeview-modal';
  while (fragmentStoreView.firstElementChild) {
    storeSwitcher.append(fragmentStoreView.firstElementChild);
  }

  const classes = ['storeview-title', 'storeview-list'];
  classes.forEach((c, i) => {
    const section = storeSwitcher.children[i];
    if (section) section.classList.add(`storeview-modal-${c}`);
  });

  const storeViewTitle = storeSwitcher.querySelector('.storeview-modal-storeview-title');
  const title = storeViewTitle.querySelector('h3');
  if (title) {
    title.className = '';
    title.closest('h3').classList.add('storeview-modal-storeview-title');
  }

  UI.render(Button, {
    children: `${storeDetails.storeViewCode} (${storeDetails.currencyCode})`, // needs to be current storeview name
    'data-testid': 'storeview-switcher-footer__modal-button',
    className: 'storeview-switcher-footer__modal-button',
    size: 'medium',
    variant: 'teritary',
    onClick: () => {
      showModal(storeSwitcher);
    },
  })($storeSwitcherBtn);

  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
