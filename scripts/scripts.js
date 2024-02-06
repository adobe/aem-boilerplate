import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  toClassName,
  getMetadata,
  decorateBlock,
  loadBlock,
} from './aem.js';
import { getOrigin, checkDomain } from './utils.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

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

function decorateLinks(main) {
  main.querySelectorAll('a').forEach((a) => {
    const url = new URL(a.href);
    const domainCheck = checkDomain(url);
    // protect against maito: links or other weirdness
    const isHttp = url.protocol === 'https:' || url.protocol === 'http:';

    if (isHttp && domainCheck.isKnown) {
      // local links are rewritten to be relative
      a.href = `${url.pathname.replace('.html', '')}${url.search}${url.hash}`;
    } else if (isHttp && domainCheck.isExternal) {
      // non local open in a new tab
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    return a;
  });
}

async function loadTemplate(main) {
  const template = toClassName(getMetadata('template'));
  if (template) {
    try {
      let templateMod;
      const cssLoaded = new Promise((resolve) => {
        try {
          loadCSS(`${window.hlx.codeBasePath}/templates/${template}/${template}.css`);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load styles for ${template}`, error);
        }
        resolve();
      });
      const jsLoaded = new Promise((resolve) => {
        (async () => {
          try {
            templateMod = await import(`../templates/${template}/${template}.js`);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to load module for ${template}`, error);
          }
          resolve();
        })();
      });
      await Promise.all([cssLoaded, jsLoaded]);
      if (templateMod && templateMod.default) {
        await templateMod.default(main);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Template Loading failed.', err);
    }
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateLinks(main);
  decorateIcons(main);
  await loadTemplate(main);
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
    await decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
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
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

function sidekickBlockListener(blockName) {
  return () => {
    const blockModal = document.querySelector(`#${blockName}-dialog`);
    if (!blockModal) {
      const block = buildBlock(blockName, '');
      document.querySelector('main').append(block);
      decorateBlock(block);
      loadBlock(block);
    } else {
      window.postMessage({ sidekickInit: true, block: blockName }, getOrigin());
    }
  };
}

function initSidekick() {
  let sk = document.querySelector('helix-sidekick');

  const dialogPlugins = ['references'];

  if (sk) {
    dialogPlugins.forEach((plugin) => {
      sk.addEventListener(`custom:${plugin}`, sidekickBlockListener(plugin));
    });
  } else {
    // wait for sidekick to be loaded
    document.addEventListener('helix-sidekick-ready', () => {
      sk = document.querySelector('helix-sidekick');
      dialogPlugins.forEach((plugin) => {
        sk.addEventListener(`custom:${plugin}`, sidekickBlockListener(plugin));
      });
    }, { once: true });
  }
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
  initSidekick();
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
