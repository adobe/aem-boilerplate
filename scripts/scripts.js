import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  readBlockConfig,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  toClassName,
} from './aem.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

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

function buildTabs(main) {
  // collect consecutive tab panels
  const consecutiveTabPaneles = [[]];
  // eslint-disable-next-line no-restricted-syntax
  for (const section of main.children) {
    const current = consecutiveTabPaneles[consecutiveTabPaneles.length - 1];
    const metadataBlock = section.querySelector('.section-metadata');
    const metadata = metadataBlock ? readBlockConfig(metadataBlock) : {};
    const tabLabel = metadata['tab-label'];

    if (!tabLabel) {
      // section is not a tab panel
      if (current.length > 0) {
        // end of current list of consecutive tab panels
        consecutiveTabPaneles.push([]);
      }
    } else {
      current.push([tabLabel, section]);
    }
  }

  // build tab lists
  consecutiveTabPaneles.forEach((tabPanels, tabsIdx) => {
    if (!tabPanels.length) return;

    const [, firstTabPanel] = tabPanels[0];

    const tabList = document.createElement('ul');
    tabList.role = 'tablist';

    tabPanels.forEach(([tabLabel, tabPanel], i) => {
      const tabId = `tabs-${tabsIdx}-tab-${toClassName(tabLabel)}`;
      const tabPanelId = `tabs-${tabsIdx}-panel-${toClassName(tabLabel)}`;

      // build the tabs as buttons and append them to the tab list
      const tabItem = document.createElement('button');
      tabItem.id = tabId;
      tabItem.role = 'tab';
      tabItem.ariaSelected = i === 0;
      tabItem.tabIndex = i === 0 ? 0 : -1;
      tabItem.setAttribute('aria-controls', tabPanelId);
      tabItem.textContent = tabLabel;

      const li = document.createElement('li');
      li.appendChild(tabItem);
      tabList.appendChild(li);

      // update the tab panel to use the tab id
      tabPanel.id = tabPanelId;
      tabPanel.setAttribute('aria-labelledby', tabId);
      tabPanel.classList.add('hidden');

      // update the tab panel to use the tab id
      tabPanel.id = tabPanelId;
      tabPanel.role = 'tabpanel';
      tabPanel.tabIndex = 0;
      tabPanel.setAttribute('aria-labelledby', tabId);
      if (i > 0) tabPanel.setAttribute('hidden', '');
    });

    // if there is a previous section, and if the last content element is a tab-list block,
    // add the tab list to it, otherwise create a new section and a tab-list block inside of
    // it and prepend it before the first tab panel.
    const previousSection = firstTabPanel.previousElementSibling;
    let previousBlock = previousSection?.lastElementChild;
    if (previousBlock?.matches('.section-metadata')) previousBlock = previousBlock.previousElementSibling;
    if (previousBlock?.matches('.tab-list')) {
      previousBlock.appendChild(tabList);
    } else {
      const tabListBlock = document.createElement('div');
      tabListBlock.className = 'tab-list block';
      tabListBlock.appendChild(tabList);
      const section = document.createElement('div');
      section.className = 'section';
      section.appendChild(tabListBlock);
      firstTabPanel.before(section);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildTabs(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
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
  decorateBlocks(main);
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
