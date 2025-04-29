import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  readBlockConfig,
} from './aem.js';

import { setConfig, loadArea, loadStyle } from './nx.js';

const conf = {
  locales: { '': { ietf: 'en', tk: 'cks7hcz.css' } },
  decorateArea: (area = document) => {
    const eagerLoad = (parent, selector) => {
      const img = parent.querySelector(selector);
      img?.removeAttribute('loading');
    };

    eagerLoad(area, 'img');
  },
};

const config = setConfig(conf);
config.decorateArea();

async function articleCheck() {
  const { pathname } = window.location;
  if (!pathname.startsWith(`${config.locale.base}/en/blog/`)) return;
  if (!pathname.split('/').length > 4) return;
  const script = import('../templates/article/article.js');
  const style = loadStyle('/templates/article/article.css');
  await Promise.all([script, style]);
}

await articleCheck();
loadArea();


/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}



/**
 * Get all sections that have a data-id attribute and change data-id to id.
 * @param {*} main The container element
 * @author JMP
 */
function updateSectionIds(main) {
  main.querySelectorAll('div.section[data-id]:not([data-id=""])').forEach((section) => {
    section.id = section.getAttribute('data-id');
    section.removeAttribute('data-id');
  });
}

/** JMP Section Group Layout Support */

/*
 * Separate the page into multiple divs using the dividers.
*/
export function buildColumns(wrapper, section, numberOfGroups) {
  // Create all group divs.
  for (let i = 1; i <= numberOfGroups; i++) {
    const noGroupDiv = document.createElement('div');
    noGroupDiv.classList.add(`group-${i}`);
    wrapper.append(noGroupDiv);
  }

  // Sort elements into groups. Every time you hit separator, increment group #.
  let currentGroupNumber = 1;

  [...section.children].forEach((child) => {
    const curr = wrapper.querySelector(`.group-${currentGroupNumber}`);
    if (child.classList.contains('divider-wrapper')) {
      currentGroupNumber += 1;
      child.remove();
    } else {
      curr?.append(child);
    }
  });

  // Add all groups back to the page.
  section.append(wrapper);
}

/*
 * Separate the page into multiple accordions using the dividers.
*/
export function buildAccordions(wrapper, section, numberOfGroups) {
  // Create all group divs.
  for (let i = 1; i <= numberOfGroups; i++) {
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.classList.add(`accordion-${i}`);

    const body = document.createElement('div');
    body.className = 'accordion-item-body';

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.classList.add(`accordion-${i}`);
    details.append(summary, body);
    wrapper.append(details);
  }

  // Sort elements into groups. Every time you hit separator, increment group #.
  let currentGroupNumber = 1;

  [...section.children].forEach((child) => {
    const curr = wrapper.querySelector(`.accordion-${currentGroupNumber}`);
    if (child.classList.contains('divider-wrapper')) {
      currentGroupNumber += 1;
      const config = readBlockConfig(child.querySelector('div'));
      curr.querySelector('summary').prepend(config.accordiontitle);
      child.remove();
    } else {
      curr.querySelector('.accordion-item-body').append(child);
    }
  });

  const lastItem = wrapper.querySelector(`.accordion-${numberOfGroups} summary`);
  lastItem.prepend(section.getAttribute('data-accordiontitle'));

  // Add all groups back to the page.
  section.append(wrapper);
}

/*
 * Separate the page into multiple tabs using the dividers.
*/
export function buildTabs(wrapper, section, numberOfGroups) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // Create all tab panels and buttons first.
  for (let i = 1; i <= numberOfGroups; i++) {
    const tabpanel = document.createElement('div');
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${i}`;
    tabpanel.setAttribute('aria-hidden', i !== 1);
    tabpanel.setAttribute('aria-labelledby', `tab-${i}`);
    tabpanel.setAttribute('role', 'tabpanel');

    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${i}`;
    button.setAttribute('aria-controls', `tabpanel-${i}`);
    button.setAttribute('aria-selected', i === 1);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      section.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll(':scope > button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
      // Unhide any nested tabs that are selected.
      tabpanel.querySelectorAll('button[aria-selected=true]').forEach((selectedButton) => {
        const controlledPanel = selectedButton.getAttribute('aria-controls');
        document.getElementById(controlledPanel).setAttribute('aria-hidden', false);
      });
    });
    tablist.append(button);
    wrapper.append(tabpanel);
  }

  // Sort elements into groups. Every time you hit separator, increment group #.
  let currentGroupNumber = 1;
  [...section.children].forEach((child) => {
    const currTabPanel = wrapper.querySelector(`#tabpanel-${currentGroupNumber}`);
    const currTabButton = tablist.querySelector(`#tab-${currentGroupNumber}`);
    if (child.classList.contains('divider-wrapper')) {
      currentGroupNumber += 1;
      const config = readBlockConfig(child.querySelector('div'));
      currTabButton.innerHTML = config.tabtitle;
      child.remove();
    } else {
      currTabPanel.append(child);
    }
  });

  const lastButton = tablist.querySelector(`#tab-${numberOfGroups}`);
  lastButton.innerHTML = section.getAttribute('data-tabtitle');

  wrapper.prepend(tablist);
  section.append(wrapper);
}

/**
 * Builds multi group layout within a section.
 * Expect layout to be written as '# column' i.e. '2 column' or '3 column'.
 * OR to use accordions i.e. '2 accordion' or '3 accordion'.
 * Only intended to support column groups of 2 or 3. Can support any number of accordions.
 * @param {Element} main The container element
 */
export function buildLayoutContainer(main) {
  main.querySelectorAll(':scope > .section[data-layout]').forEach((section) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('layout-wrapper');
    const layoutType = section.getAttribute('data-layout');
    const numberOfGroups = parseInt(layoutType, 10);

    if (layoutType.includes('accordion')) {
      wrapper.classList.add('accordion-wrapper');
      buildAccordions(wrapper, section, numberOfGroups);
    } else if (layoutType.includes('tabs')) {
      wrapper.classList.add('tabs-wrapper');
      buildTabs(wrapper, section, numberOfGroups);
    } else {
      buildColumns(wrapper, section, numberOfGroups);
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  updateSectionIds(main); // JMP Added
  decorateBlocks(main);
  buildLayoutContainer(main); // JMP Added
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Add background image to entire section if present.
 * @param {*} main the Container Element
 * @author JMP
 */
function buildSectionBackground(main) {
  main.querySelectorAll('div.section-metadata').forEach((metadata) => {
    const config = readBlockConfig(metadata);
    const position = Object.keys(config).indexOf('background-image');
    if (position >= 0) {
      const picture = metadata.children[position].children[1].querySelector('picture');
      const block = buildBlock('background-img', { elems: [picture] });
      metadata.children[position].remove();
      metadata.parentElement.prepend(block);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 * @author Adobe & JMP modified
 */
export function buildAutoBlocks(main) {
  try {
    // buildHeroBlock(main);
    buildSectionBackground(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}


/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
