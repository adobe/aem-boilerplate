import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Closes the mobile menu and resets the hamburger to its default state.
 * @param {Element} nav The nav element
 */
function closeMobileMenu(nav) {
  nav.setAttribute('aria-expanded', 'false');
  const button = nav.querySelector('.nav-hamburger button');
  if (button) button.setAttribute('aria-label', 'Open navigation');
  document.body.style.overflowY = '';
}

/**
 * Toggles the mobile menu open/closed.
 * @param {Element} nav The nav element
 * @param {Boolean} forceExpanded Optional — force a specific state
 */
function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  if (button) button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
}

/**
 * Builds a search form. Search controls are created in JS (not authored in the
 * nav fragment) so the fragment stays portable and DA/EDS-safe.
 * @returns {Element} the search form wrapper
 */
function buildSearchForm() {
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-search';
  const form = document.createElement('form');
  form.setAttribute('role', 'search');
  form.action = '/search';
  form.method = 'get';

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'Search';
  input.setAttribute('aria-label', 'Search');

  const button = document.createElement('button');
  button.type = 'submit';
  button.setAttribute('aria-label', 'Search');
  button.className = 'nav-search-submit';

  form.append(input, button);
  wrapper.append(form);
  return wrapper;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment (localhost then DA/EDS)
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  let fragment = await loadFragment('/content/nav');
  if (!fragment || !fragment.firstElementChild) {
    fragment = await loadFragment(navPath);
  }

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // The fragment produces five sections, in order:
  // 0 brand/logo, 1 utility links, 2 login, 3 main nav links, 4 apply/track
  const sections = [...nav.children];
  const [brand, utility, login, primary, actions] = sections;
  if (brand) brand.classList.add('nav-brand');
  if (utility) utility.classList.add('nav-utility');
  if (login) login.classList.add('nav-login');
  if (primary) primary.classList.add('nav-primary');
  if (actions) actions.classList.add('nav-actions');

  // Strip EDS button decoration from the logo + login links
  nav.querySelectorAll('a.button').forEach((a) => {
    const container = a.closest('.button-container');
    a.className = '';
    if (container) container.className = '';
  });

  // Resolve relative nav image paths (authored relative to the nav fragment at
  // /content/nav) to absolute /content/… paths so they load on any page URL.
  nav.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      img.setAttribute('src', `/content/${src}`);
    }
  });

  // Build the two visual rows: a top (grey) utility bar and a bottom (orange)
  // nav bar. Each row spans full width (colored background) with a centered,
  // max-width inner container holding the content.
  const topRow = document.createElement('div');
  topRow.className = 'nav-row nav-row-top';
  const topInner = document.createElement('div');
  topInner.className = 'nav-row-inner';
  if (brand) topInner.append(brand);
  const topTools = document.createElement('div');
  topTools.className = 'nav-utility-group';
  if (utility) topTools.append(utility);
  if (login) topTools.append(login);
  topInner.append(topTools);
  topRow.append(topInner);

  const bottomRow = document.createElement('div');
  bottomRow.className = 'nav-row nav-row-bottom';
  const bottomInner = document.createElement('div');
  bottomInner.className = 'nav-row-inner';
  if (primary) bottomInner.append(primary);
  const bottomTools = document.createElement('div');
  bottomTools.className = 'nav-tools';
  if (actions) bottomTools.append(actions);
  bottomTools.append(buildSearchForm());
  bottomInner.append(bottomTools);
  bottomRow.append(bottomInner);

  nav.append(topRow, bottomRow);

  // hamburger for mobile — lives in the top row's inner container
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav));
  topInner.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // reset menu state when crossing the desktop/mobile breakpoint
  isDesktop.addEventListener('change', () => closeMobileMenu(nav));

  // close on escape
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && !isDesktop.matches) closeMobileMenu(nav);
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
