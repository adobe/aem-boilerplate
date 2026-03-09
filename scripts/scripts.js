import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  fetchPlaceholders,
  getMetadata,
} from './aem.js';
import { picture, source, img } from './dom-helpers.js';

import {
  getLanguage,
  formatDate,
  PATH_PREFIX,
} from './utils.js';

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
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

function whatBlockIsThis(element) {
  let currentElement = element;

  while (currentElement.parentElement) {
    if (currentElement.parentElement.classList.contains('block')) return currentElement.parentElement;
    currentElement = currentElement.parentElement;
    if (currentElement.classList.length > 0) return currentElement.classList[0];
  }
  return null;
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

/**
 * Decorates Dynamic Media images by modifying their URLs to include specific parameters
 * and creating a <picture> element with different sources for different image formats and sizes.
 *
 * @param {HTMLElement} main - The main container element that includes the links to be processed.
 */
export function decorateDMImages(main) {
  main.querySelectorAll('a[href^="https://delivery-p"]').forEach((a) => {
    const url = new URL(a.href.split('?')[0]);
    if (url.hostname.endsWith('.adobeaemcloud.com')) {
      const blockBeingDecorated = whatBlockIsThis(a);
      let blockName = '';
      let rotate = '';
      let flip = '';
      let crop = '';

      if (blockBeingDecorated) {
        blockName = Array.from(blockBeingDecorated.classList).find((className) => className !== 'block');
      }
      if (blockName && blockName === 'dynamicmedia-image') {
        rotate = blockBeingDecorated?.children[3]?.textContent?.trim();
        flip = blockBeingDecorated?.children[4]?.textContent?.trim();
        crop = blockBeingDecorated?.children[5]?.textContent?.trim();
      }

      const uuidPattern = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;
      const match = url.href?.match(uuidPattern);
      if (!match) {
        throw new Error('No asset UUID found in URL');
      }
      const hrefWOExtn = url.href?.substring(0, url.href?.lastIndexOf('.'))?.replace(/\/original\/(?=as\/)/, '/');
      const pictureEl = picture(
        source({
          srcset: `${hrefWOExtn}.webp?width=1400&quality=85&preferwebp=true${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          type: 'image/webp',
          media: '(min-width: 992px)',
        }),
        source({
          srcset: `${hrefWOExtn}.webp?width=1320&quality=85&preferwebp=true${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          type: 'image/webp',
          media: '(min-width: 768px)',
        }),
        source({
          srcset: `${hrefWOExtn}.webp?width=780&quality=85&preferwebp=true${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          type: 'image/webp',
          media: '(min-width: 320px)',
        }),
        source({
          srcset: `${hrefWOExtn}.webp?width=1400&quality=85${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          media: '(min-width: 992px)',
        }),
        source({
          srcset: `${hrefWOExtn}.webp?width=1320&quality=85${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          media: '(min-width: 768px)',
        }),
        source({
          srcset: `${hrefWOExtn}.webp?width=780&quality=85${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          media: '(min-width: 320px)',
        }),
        img({
          src: `${hrefWOExtn}.webp?width=1400&quality=85${rotate ? `&rotate=${rotate}` : ''}${flip ? `&flip=${flip.toLowerCase()}` : ''}${crop ? `&crop=${crop.toLowerCase()}` : ''}`,
          alt: a.innerText,
        }),
      );
      a.replaceWith(pictureEl);
    }
  });
}

/**
 * Return the placeholder file specific to language
 * @returns
 */
export async function fetchLanguagePlaceholders() {
  const langCode = getLanguage();
  try {
    // Try fetching placeholders with the specified language
    return await fetchPlaceholders(`${PATH_PREFIX}/${langCode}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching placeholders for lang: ${langCode}. Will try to get en placeholders`, error);
    // Retry without specifying a language (using the default language)
    try {
      return await fetchPlaceholders(`${PATH_PREFIX}/en`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching placeholders:', err);
    }
  }
  return {}; // default to empty object
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateDMImages(main);
  decorateButtons(main);
}

async function renderWBDataLayer() {
  const lastPubDateStr = getMetadata('published-time');
  const firstPubDateStr = getMetadata('content_date') || lastPubDateStr;
  window.wbgData.page = {
    pageInfo: {
      pageCategory: getMetadata('pagecategory'),
      channel: getMetadata('channel'),
      themecfreference: getMetadata('theme_cf_reference'),
      contentType: getMetadata('content_type'),
      pageUid: getMetadata('pageuid'),
      pageName: getMetadata('pagename'),
      hostName: getMetadata('hostname'),
      pageFirstPub: formatDate(firstPubDateStr),
      pageLastMod: formatDate(lastPubDateStr),
      webpackage: '',
    },
  };
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  renderWBDataLayer();
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
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

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
  window.wbgData ||= {};
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
