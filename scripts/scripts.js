/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import { events } from '@dropins/tools/event-bus.js';
import {
  buildBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  loadFooter,
  loadHeader,
  getMetadata,
  loadScript,
  toCamelCase,
  toClassName,
  readBlockConfig,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  sampleRUM,
} from './aem.js';
import { trackHistory } from './commerce.js';
import initializeDropins from './initializers/index.js';
import { removeHashTags } from './api/hashtags/parser.js';

const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
  // define your custom audiences here as needed
};

/**
 * Gets all the metadata elements that are in the given scope.
 * @param {String} scope The scope/prefix for the metadata
 * @returns an array of HTMLElement nodes that match the given scope
 */
export function getAllMetadata(scope) {
  return [...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)]
    .reduce((res, meta) => {
      const id = toClassName(meta.name
        ? meta.name.substring(scope.length + 1)
        : meta.getAttribute('property').split(':')[1]);
      res[id] = meta.getAttribute('content');
      return res;
    }, {});
}

// Define an execution context
const pluginContext = {
  getAllMetadata,
  getMetadata,
  loadCSS,
  loadScript,
  sampleRUM,
  toCamelCase,
  toClassName,
};

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
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

function autolinkModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');

    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault();
      const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
      openModal(origin.href);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorate Columns Template to the main element.
 * @param {Element} main The container element
 */
function buildTemplateColumns(doc) {
  const columns = doc.querySelectorAll('main > div.section[data-column-width]');

  columns.forEach((column) => {
    const columnWidth = column.getAttribute('data-column-width');
    const gap = column.getAttribute('data-gap');

    if (columnWidth) {
      column.style.setProperty('--column-width', columnWidth);
      column.removeAttribute('data-column-width');
    }

    if (gap) {
      column.style.setProperty('--gap', `var(--spacing-${gap.toLocaleLowerCase()})`);
      column.removeAttribute('data-gap');
    }
  });
}

async function applyTemplates(doc) {
  if (doc.body.classList.contains('columns')) {
    buildTemplateColumns(doc);
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
 * Decorates all links in scope of element
 *
 * @param {HTMLElement} element
 */
function decorateLinks(element) {
  element.querySelectorAll('a').forEach((a) => {
    if (!a.hash) {
      return;
    }
    a.addEventListener('click', (evt) => {
      removeHashTags(evt.target);
    });
  });
}

function preloadFile(href, as) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();

  // Instrument experimentation plugin
  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadEager: runEager } = await import('../plugins/experimentation/src/index.js');
    await runEager(document, { audiences: AUDIENCES, overrideMetadataFields: ['placeholders'] }, pluginContext);
  }

  await initializeDropins();

  window.adobeDataLayer = window.adobeDataLayer || [];

  let pageType = 'CMS';
  if (document.body.querySelector('main .product-details')) {
    pageType = 'Product';

    // initialize pdp
    await import('./initializers/pdp.js');

    // Preload PDP Dropins assets
    preloadFile('/scripts/__dropins__/storefront-pdp/api.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/render.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductHeader.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductPrice.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductShortDescription.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductOptions.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductQuantity.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductDescription.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductAttributes.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductGallery.js', 'script');
  } else if (document.body.querySelector('main .product-list-page')) {
    pageType = 'Category';
    preloadFile('/scripts/widgets/search.js', 'script');
  } else if (document.body.querySelector('main .product-list-page-custom')) {
    // TODO Remove this bracket if not using custom PLP
    pageType = 'Category';
    const plpBlock = document.body.querySelector('main .product-list-page-custom');
    const { category, urlpath } = readBlockConfig(plpBlock);

    if (category && urlpath) {
      // eslint-disable-next-line import/no-unresolved, import/no-absolute-path
      const { preloadCategory } = await import('/blocks/product-list-page-custom/product-list-page-custom.js');
      preloadCategory({ id: category, urlPath: urlpath });
    }
  } else if (document.body.querySelector('main .commerce-cart')) {
    pageType = 'Cart';
  } else if (document.body.querySelector('main .commerce-checkout')) {
    pageType = 'Checkout';
  }

  window.adobeDataLayer.push(
    {
      pageContext: {
        pageType,
        pageName: document.title,
        eventType: 'visibilityHidden',
        maxXOffset: 0,
        maxYOffset: 0,
        minXOffset: 0,
        minYOffset: 0,
      },
    },
    {
      shoppingCartContext: {
        totalQuantity: 0,
      },
    },
  );
  window.adobeDataLayer.push((dl) => {
    dl.push({ event: 'page-view', eventInfo: { ...dl.getState() } });
  });

  const main = doc.querySelector('main');
  if (main) {
    // Main Decorations
    decorateMain(main);

    // Template Decorations
    await applyTemplates(doc);

    // Load LCP blocks
    await loadSection(main.querySelector('.section'), waitForFirstImage);
    document.body.classList.add('appear');
  }

  events.emit('eds/lcp', true);

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
  autolinkModals(doc);

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  await Promise.all([
    loadHeader(doc.querySelector('header')),
    loadFooter(doc.querySelector('footer')),
    loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`),
    loadFonts(),
    import('./acdl/adobe-client-data-layer.min.js'),
  ]);

  if (sessionStorage.getItem('acdl:debug')) {
    import('./acdl/validate.js');
  }

  trackHistory();

  // Implement experimentation preview pill
  if ((getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length)) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadLazy: runLazy } = await import('../plugins/experimentation/src/index.js');
    await runLazy(document, { audiences: AUDIENCES }, pluginContext);
  }
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  decorateLinks(doc);
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

export async function fetchIndex(indexFile, pageSize = 500) {
  const handleIndex = async (offset) => {
    const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`);
    const json = await resp.json();

    const newIndex = {
      complete: (json.limit + json.offset) === json.total,
      offset: json.offset + pageSize,
      promise: null,
      data: [...window.index[indexFile].data, ...json.data],
    };

    return newIndex;
  };

  window.index = window.index || {};
  window.index[indexFile] = window.index[indexFile] || {
    data: [],
    offset: 0,
    complete: false,
    promise: null,
  };

  // Return index if already loaded
  if (window.index[indexFile].complete) {
    return window.index[indexFile];
  }

  // Return promise if index is currently loading
  if (window.index[indexFile].promise) {
    return window.index[indexFile].promise;
  }

  window.index[indexFile].promise = handleIndex(window.index[indexFile].offset);
  const newIndex = await (window.index[indexFile].promise);
  window.index[indexFile] = newIndex;

  return newIndex;
}

/**
 * Get root path
 */
export function getRootPath() {
  window.ROOT_PATH = window.ROOT_PATH || getMetadata('root') || '/';
  return window.ROOT_PATH;
}

/**
 * Decorates links.
 * @param {string} [link] url to be localized
 */
export function rootLink(link) {
  const root = getRootPath().replace(/\/$/, '');

  // If the link is already localized, do nothing
  if (link.startsWith(root)) return link;
  return `${root}${link}`;
}

/**
 * Check if consent was given for a specific topic.
 * @param {*} topic Topic identifier
 * @returns {boolean} True if consent was given
 */
// eslint-disable-next-line no-unused-vars
export function getConsent(topic) {
  console.warn('getConsent not implemented');
  return true;
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

(async function loadDa() {
  if (!new URL(window.location.href).searchParams.get('dapreview')) return;
  // eslint-disable-next-line import/no-unresolved
  import('https://da.live/scripts/dapreview.js').then(({ default: daPreview }) => daPreview(loadPage));
}());
