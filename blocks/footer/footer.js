// Dropin Components
import {
  Button,
  Accordion,
  AccordionSection,
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

  const classes = ['storeview-title', 'storeview-list', 'storeview-accordion'];
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

  const storeViewList = storeSwitcher.querySelector('.storeview-modal-storeview-list');

  const storeViewAccordion = storeSwitcher.querySelector('.storeview-modal-storeview-accordion');


  // 



  if (storeViewList) {
    storeViewList.querySelectorAll(':scope .default-content-wrapper > ul ').forEach((storeSelection, i) => {

      const storeTitle = storeSelection.querySelector('ul');
      storeTitle.closest('li').classList.add(`storeSelection-${i}`);



      // if (section) section.classList.add(`storeSelection-list-${i}`);
      // convert each UL into an object that can be rendered

      const storeSelectionObj = Array.from(storeSelection.children).map((li) => ({
        language: li.querySelector('a').innerText,
        currency: storeSelection.querySelector('li').firstChild.textContent.trim(),
        rawHTML: li.querySelector('a').outerHTML,
        link: li.querySelector('a').href,
        key: li,
      }));

      // console.log(storeSelectionObj);
      // // console.log(storeSelection);

      // console.log(`storeSelection-${i}`);

      // const storeViewAccordion2 = storeSwitcher.querySelector(`storeSelection-${i}`);

      // console.log(storeViewAccordion2);
      // //     // For each storeSelectionObj, render an accordion section
      // storeSelectionObj.forEach((item) => {
      //   UI.render(AccordionSection, {
      //     iconOpen: 'ChevronRight',
      //     iconClose: 'ChevronDown',
      //     // iconLeft: 'Burger',
      //     title: item.language,
      //     showIconLeft: true,
      //     children: item.rawHTML,
      //   })(storeViewAccordion);
      // });

      // UI.render(AccordionSection, {
      //   iconOpen: 'ChevronRight',
      //   iconClose: 'ChevronDown',
      //   iconLeft: 'Burger',
      //   title: storeSelection.querySelector('li').firstChild.textContent,
      //   showIconLeft: true,
      //   children: storeSelectionObj.map((item) => `<div dangerouslySetInnerHTML={{ __html: "Hello" }}>${item.text}</div>`).join(''),
      // })(storeViewAccordion);



    });
  };




  // rendering properly 
  // UI.render(AccordionSection, {
  //   iconOpen: 'ChevronRight',
  //   iconClose: 'ChevronDown',
  //   iconLeft: 'Burger',
  //   title: 'test',
  //   showIconLeft: true,
  //   children: 'test',
  // })(storeViewAccordion);

  //Not rendering properly 
  // UI.render(Accordion, {
  //   title: 'test',
  //   actionIconPosition: 'right',
  //   children: 'test',

  // })(storeViewList);






  // storeViewList.innerHTML = `
  //    test
  //   `;

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
