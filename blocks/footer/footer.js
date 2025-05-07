import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // Check if current page is specifically the /blog page
  const isBlogPage = window.location.pathname === '/en/blog' || 
                     window.location.pathname === '/en/blog/';
  
  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Add transparent-footer class if it's the blog page
  if (isBlogPage) {
    // Add class to the parent footer element for transparent background
    const parentFooter = block.closest('footer');
    if (parentFooter) {
      parentFooter.classList.add('transparent-footer');
    }
    
    // Also add class to the footer wrapper
    footer.classList.add('transparent-footer-wrapper');
    block.classList.add('transparent-footer-container');
  }

  block.append(footer);
}
