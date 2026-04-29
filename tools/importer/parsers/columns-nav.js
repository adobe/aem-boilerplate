/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-nav variant.
 * Base block: columns
 * Source: https://www.meag.com/index_en.html
 * Selector: .quickNavigation
 * Generated: 2026-04-29
 *
 * Two-column navigation block:
 * - Left column: heading (h2) + linked list (ul.linked-list) with navigation links
 * - Right column: image teaser card with image + link text
 */
export default function parse(element, { document }) {
  // --- Left column: heading + link list ---
  const heading = element.querySelector('h2, h3, [class*="large-offset"]');
  const linkList = element.querySelector('ul.linked-list, .quickNavigation__navigation ul');

  const leftCell = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    leftCell.push(h2);
  }

  if (linkList) {
    // Clone the list to preserve semantic HTML (ul > li > a structure)
    const ul = document.createElement('ul');
    const items = linkList.querySelectorAll('li');
    items.forEach((li) => {
      const link = li.querySelector('a');
      if (link) {
        const newLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        newLi.appendChild(a);
        ul.appendChild(newLi);
      }
    });
    leftCell.push(ul);
  }

  // --- Right column: image teaser with background ---
  const teaserContainer = element.querySelector(
    '.imageTextTeaserWithBackground, [class*="imageTextTeaser"]'
  );

  const rightCell = [];
  if (teaserContainer) {
    const img = teaserContainer.querySelector('img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      rightCell.push(newImg);
    }

    const teaserLink = teaserContainer.querySelector('a');
    if (teaserLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = teaserLink.href;
      a.textContent = teaserLink.textContent.trim();
      p.appendChild(a);
      rightCell.push(p);
    }
  }

  // --- Build block table: one row, two columns ---
  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns-nav',
    cells,
  });

  element.replaceWith(block);
}
