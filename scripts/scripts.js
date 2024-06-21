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
  getMetadata,
  toClassName,
  dispatchAsyncEvent,
  withPlugin,
} from './aem.js';

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
 */
document.addEventListener('aem:eager', async () => {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = document.querySelector('main');
  if (main) {
    decorateMain(main);
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
});

/**
 * Loads everything that doesn't need to be delayed.
 */
document.addEventListener('aem:lazy', async () => {
  const main = document.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? document.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(document.querySelector('header'));
  loadFooter(document.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
});

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
document.addEventListener('aem:delayed', async () => {
  import('./delayed.js');
});

document.addEventListener('aem:eager', (ev) => {
  console.log(1, ev.type, ev.detail);
  ev.await(new Promise((res) => {
    setTimeout(() => {
      console.log('foo from', ev.type);
      res();
    }, 1000);
  }));
});

document.addEventListener('aem:eager', (ev) => {
  console.log(2, ev.type, ev.detail);
});

withPlugin('dummy-plugin', {
  eager: () => console.log('plugin:eager'),
  lazy: () => console.log('plugin:lazy'),
  delayed: () => console.log('plugin:delayed'),
});

withPlugin('block-debugger', {
  condition: () => true,
  run: () => {
    document.addEventListener('aem:block:config', (ev) => console.group(ev.detail.name) && console.log(ev.type, ev.detail));
    document.addEventListener('aem:block:decorated', (ev) => console.log(ev.type, ev.detail));
    document.addEventListener('aem:block:loaded', (ev) => console.log(ev.type, ev.detail) && console.groupEnd());
  },
});

window.addEventListener('load', (ev) => console.log(ev.type, ev.detail));
document.addEventListener('DOMContentLoaded', (ev) => console.log(ev.type, ev.detail));
document.addEventListener('aem:eager', (ev) => console.log(ev.type, ev.detail));
document.addEventListener('aem:lazy', (ev) => console.log(ev.type, ev.detail));
document.addEventListener('aem:delayed', (ev) => console.log(ev.type, ev.detail));

async function loadPage() {
  await dispatchAsyncEvent('aem:eager');
  await dispatchAsyncEvent('aem:lazy');
  window.setTimeout(async () => {
    await dispatchAsyncEvent('aem:delayed');
  }, 3000);
}

loadPage();
