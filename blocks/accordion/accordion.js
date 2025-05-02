/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

import { decorateMain } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';

async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default function decorate(block) {
  [...block.children].forEach((row, i) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    summary.id = summary.textContent.replaceAll(' ', '-').toLowerCase();
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    const links = body.querySelectorAll('a');
    const frag = [...links].filter(l => l.href.includes('/fragments/'));
    if (frag.length) {
      const frags = [];
      frag.forEach(async link => {
        const path = link ? link.getAttribute('href') : block.textContent.trim();
        const fragment = await loadFragment(path);
        const fragBlock = document.createElement('div');
        fragBlock.classList.add('content');
        body.replaceChildren(...fragment.childNodes);
        frags.push(fragBlock);
      });
      body.replaceChildren(...frags);
    }
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
    if (i === 0) summary.parentElement.setAttribute('open', true);
  });
}
