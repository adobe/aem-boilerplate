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

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

// Pull Config Values for Store Details 
const storeDetails = {
  storeViewCode: await getConfigValue('commerce.headers.cs.Magento-Store-View-Code'),
  currencyCode: await getConfigValue('commerce-base-currency-code'),
};

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleStoreDropdown(sections, expanded = false) {
  sections
    .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
    .forEach((section) => {
      section.setAttribute('aria-expanded', expanded);
    });
}

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
    // console.log(fragmentStoreView.firstElementChild)
    storeSwitcher.append(fragmentStoreView.firstElementChild);
  }

  // create classes for storeview modal sections
  const classes = ['storeview-title', 'storeview-list', 'storeview-accordion'];
  classes.forEach((c, i) => {
    const section = storeSwitcher.children[i];
    if (section) section.classList.add(`storeview-modal-${c}`);
  });

  // Store Switcher Modal Content - Store View Title
  const storeViewTitle = storeSwitcher.querySelector('.storeview-modal-storeview-title');
  const title = storeViewTitle.querySelector('h3');
  if (title) {
    title.className = '';
    title.closest('h3').classList.add('storeview-modal-storeview-title');
  }

  // Storeview List
  const storeViewList = storeSwitcher.querySelector('.storeview-modal-storeview-list');

  if (storeViewList) {
    storeViewList
      .querySelectorAll(':scope .default-content-wrapper > ul')
      .forEach((storeView) => {
        if (storeView.querySelector('ul')) storeView.classList.add('storeview-drop');
      });

    storeViewList.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((storeView) => {
      storeView.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = storeView.getAttribute('aria-expanded') === 'true';
          toggleStoreDropdown(storeViewList);
          storeView.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
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
