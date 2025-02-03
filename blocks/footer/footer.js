// Dropin Components
import {
  Button,
  provider as UI,
} from '@dropins/tools/components.js';

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Block-level
import createModal from '../modal/modal.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
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

  // Store Switcher Modal Content
  const storeSwitcher = document.createElement('div');

  // Rendering the Store Switcher Modal Content
  const $orderConfirmationFooterContinueBtn = footer.querySelector(
    '.storeview-switcher-footer__modal-button',
  );
  UI.render(Button, {
    children: 'Continue shopping',
    'data-testid': 'storeview-switcher-footer__modal-button',
    className: 'storeview-switcher-footer__modal-button',
    size: 'medium',
    variant: 'teritary',
    onClick: () => {
      showModal(storeSwitcher);
    },
  })($orderConfirmationFooterContinueBtn);

  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

}
