import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (localhost then DA/EDS)
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment('/content/footer');
  if (!fragment || !fragment.firstElementChild) {
    fragment = await loadFragment(footerPath);
  }

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Resolve relative image paths (authored relative to the footer fragment at
  // /content/footer) to absolute /content/… paths so they load on any page URL.
  footer.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
      img.setAttribute('src', `/content/${src}`);
    }
  });

  // The fragment produces eight top-level sections, in order:
  // 0 brand logo+tagline, 1 Follow Us + social, 2 Types of Credit Cards,
  // 3 Important Links, 4 Learn More, 5 disclaimer, 6 legal links, 7 copyright
  const sectionClasses = [
    'footer-brand',
    'footer-social',
    'footer-links',
    'footer-links',
    'footer-links',
    'footer-disclaimer',
    'footer-legal',
    'footer-copyright',
  ];
  [...footer.children].forEach((section, i) => {
    if (sectionClasses[i]) section.classList.add(sectionClasses[i]);
  });

  // Group the top region (brand + social + 3 link columns) and the bottom
  // region (disclaimer + legal + copyright) into wrappers for layout.
  const children = [...footer.children];
  const topRegion = document.createElement('div');
  topRegion.className = 'footer-top';

  // First column stacks the brand block above the social block.
  const brandCol = document.createElement('div');
  brandCol.className = 'footer-brand-col';
  brandCol.append(children[0], children[1]);
  topRegion.append(brandCol);
  // The three link columns follow.
  children.slice(2, 5).forEach((el) => topRegion.append(el));

  const bottomRegion = document.createElement('div');
  bottomRegion.className = 'footer-bottom';
  children.slice(5).forEach((el) => bottomRegion.append(el));

  footer.append(topRegion, bottomRegion);

  block.append(footer);
}
