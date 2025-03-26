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
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const picture = main.querySelector('picture');
  if (!picture) return;

  // Find the closest section or div that contains the picture
  const section = picture.closest('div') || picture.parentElement;
  if (!section) return;
  
  const heroElements = [picture];
  const elementsAfterPicture = [];
  
  // Get all elements in the same section
  const h1s = section.querySelectorAll('h1');
  const paragraphs = section.querySelectorAll('p');
  const links = section.querySelectorAll('a:not(p a)'); // Get links that aren't inside paragraphs
  
  // Process h1s
  h1s.forEach((h1) => {
    // eslint-disable-next-line no-bitwise
    if (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
      elementsAfterPicture.push(h1);
    }
  });

  // Process p tags
  paragraphs.forEach((p) => {
    // eslint-disable-next-line no-bitwise
    if (p.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
      elementsAfterPicture.push(p);
    }
  });

  // Process standalone links
  links.forEach((link) => {
    // eslint-disable-next-line no-bitwise
    if (link.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
      link.className = 'button';
      elementsAfterPicture.push(link);
    }
  });

  // Add all collected elements to heroElements in order
  if (elementsAfterPicture.length > 0) {
    heroElements.push(...elementsAfterPicture);
    const heroSection = document.createElement('div');
    heroSection.append(buildBlock('hero', { elems: heroElements }));
    main.prepend(heroSection);
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
