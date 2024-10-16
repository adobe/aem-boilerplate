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
  sampleRUM,
} from './aem.js';

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

  sampleRUM.enhance();

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
 * Check if the browser supports Trusted Types (currently Google Chrome only)
 * https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API
 * Polyfill can be added from: https://github.com/w3c/trusted-types#polyfill
 * @returns {boolean}
 */
function browserSupportsTrustedTypes() {
  try {
    return window.trustedTypes && trustedTypes.createPolicy;
  } catch (e) {
    return false;
  }
}

const TRUSTED_SCRIPT_ORIGINS = [
  window.location.origin,
  // add more trusted origins here
];

/* eslint-disable no-unused-vars, import/no-mutable-exports */
/* Default Trusted Types policy applies for all Javascript code on the page,
 * including libraries loaded
*/
let defaultPolicy = {
  createHTML: (s, type, sink) => DOMPurify.sanitize(s),
  createScriptURL: (s, type, sink) => {
    if (!s) return undefined;
    const canonical = s.startsWith('//') ? `https:${s}` : s;

    try {
      if (TRUSTED_SCRIPT_ORIGINS.includes(new URL(canonical).origin)) {
        return s;
      }
    } catch (e) {
      // no-op
    }

    // eslint-disable-next-line no-console
    console.warn(`Blocked script from ${s} by default policy`);
    return undefined; // reject
  },
  createScript: (s, type, sink) => {
    // disallow inline scripts.
    // equivalent to setting a CSP that doesn't allow unsafe-inline
    // eslint-disable-next-line no-console
    console.warn('Blocked inline script by default policy');
    return undefined;
  },
};

/* Define your custom Trusted Types policy here */
export let aemPolicy = {
  createHTML: (s, type, sink) => undefined,
  createScriptURL: (s, type, sink) => undefined,
  createScript: (s, type, sink) => undefined,
};

if (browserSupportsTrustedTypes()) {
  defaultPolicy = trustedTypes.createPolicy('default', defaultPolicy);
  aemPolicy = trustedTypes.createPolicy('aemPolicy', aemPolicy);
}
/* eslint-enable no-unused-vars, import/no-mutable-exports */

function setCSP() {
  // define your CSP directives here
  const CSP = {
  };

  if (browserSupportsTrustedTypes()) {
    CSP['require-trusted-types-for'] = ['\'script\''];
    CSP['trusted-types'] = ['default', 'aemPolicy', 'dompurify'];
  }

  const directives = Object.keys(CSP);
  if (directives.length === 0) return;
  const policy = directives.map((directive) => `${directive} ${CSP[directive].join(' ')}`).join('; ');
  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', policy);
  document.addEventListener('securitypolicyviolation', (e) => sampleRUM('csperror', { source: `${e.documentURI}:${e.lineNumber}:${e.columnNumber}`, target: e.blockedURI }));
  document.head.appendChild(meta);
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
  setCSP();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
