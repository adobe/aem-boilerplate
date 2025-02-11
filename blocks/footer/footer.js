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
  storeViewName: await getConfigValue('commerce-store-view-name'),
};

/**
 * Toggles all storeSelector sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleStoreDropdown(sections, expanded = false) {
  sections
    .querySelectorAll('.storeview-modal .default-content-wrapper > ul > li')
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
    title.setAttribute('tabindex', '0');
  }

  // Storeview List
  const storeViewList = storeSwitcher.querySelector('.storeview-modal-storeview-list');

  if (storeViewList) {
    // Add storeview-selection class to parent UL
    storeViewList
      .querySelectorAll(':scope .default-content-wrapper > ul')
      .forEach((storeView) => {
        if (storeView.querySelector('ul')) storeView.classList.add('storeview-selection');
      });

    // if multiple stores exist per region, add class storeviews and click events for accordion
    storeViewList.querySelectorAll('.default-content-wrapper > ul > li > ul').forEach((storeRegion) => {
      if (storeRegion.children.length > 1) {
        if (storeRegion.querySelector('ul')) storeRegion.classList.add('storeviews');

        storeViewList.querySelectorAll(':scope li').forEach((storeView) => {
          // Accessiblity: addeventlistener for 'click' and keyboard event
          storeView.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const expanded = storeView.getAttribute('aria-expanded') === 'true';
              toggleStoreDropdown(storeViewList);
              storeView.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            }
          });
          storeView.addEventListener('click', () => {
            const expanded = storeView.getAttribute('aria-expanded') === 'true';
            toggleStoreDropdown(storeViewList);
            storeView.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          });
        });
      }
    });

    // If only one storeview link in region, convert parent UL into the li and remove the child UL
    storeViewList.querySelectorAll('.default-content-wrapper > ul > li > ul').forEach((storeRegion) => {
      const li = storeRegion.closest('li');

      if (storeRegion.children.length <= 1) {
        li.classList.add('storeview-single-store');
        const ulParent = li.closest('ul');
        ulParent.removeChild(li);
        ulParent.appendChild(storeRegion.firstElementChild).className = 'storeview-single-store';
        ulParent.setAttribute('tabindex', '0');
      } else {
        li.classList.add('storeview-multiple-stores');
        li.setAttribute('tabindex', '0');
      }
    });
  }

  UI.render(Button, {
    children: `${storeDetails.storeViewName ? storeDetails.storeViewName : storeDetails.storeViewCode} (${storeDetails.currencyCode})`, // If storeview name unavaialble use storeview code
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
