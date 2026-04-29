/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-icon variant.
 * Base block: cards
 * Source: https://www.meag.com/index_en.html
 * Selector: .image-text-teaser
 * Generated: 2026-04-29
 *
 * Source structure:
 *   .image-text-teaser
 *     h2.image-text-teaser__headline - section heading
 *     .image-text-teaser__wrapper
 *       .image-text-teaser__entry (x3)
 *         img.image-text-teaser__image - icon image
 *         .image-text-teaser__text
 *           h3 - card heading
 *           p (or text node) - card description
 *     .image-text-teaser__button
 *       a.meag-button - CTA link ("Read more")
 *
 * Target: Cards (Icon) block table
 *   - One row per card: [image] | [heading + text]
 *   - Section heading placed before block as default content
 *   - CTA link appended to the last card's text cell
 */
export default function parse(element, { document }) {
  // Extract the section heading and place it before the block as default content
  const sectionHeading = element.querySelector('h2.image-text-teaser__headline, h2');
  if (sectionHeading) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    element.before(h2);
  }

  // Extract all card entries
  const entries = element.querySelectorAll('.image-text-teaser__entry');

  // Extract the CTA link at the bottom
  const ctaLink = element.querySelector('.image-text-teaser__button a, a.meag-button');

  const cells = [];

  entries.forEach((entry, index) => {
    // Extract icon image
    const img = entry.querySelector('img.image-text-teaser__image, img');

    // Extract card heading
    const heading = entry.querySelector('.image-text-teaser__text h3, h3');

    // Extract card description - could be a <p> or raw text inside .image-text-teaser__text
    const textContainer = entry.querySelector('.image-text-teaser__text');
    const descParagraph = textContainer ? textContainer.querySelector('p') : null;

    // Build the text cell content
    const textCell = [];
    if (heading) {
      textCell.push(heading);
    }

    if (descParagraph) {
      textCell.push(descParagraph);
    } else if (textContainer) {
      // Handle case where description is a raw text node (not wrapped in <p>)
      const textNodes = [];
      textContainer.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textNodes.push(node.textContent.trim());
        }
      });
      if (textNodes.length > 0) {
        const p = document.createElement('p');
        p.textContent = textNodes.join(' ');
        textCell.push(p);
      }
    }

    // Append the CTA link to the last card's text cell
    if (ctaLink && index === entries.length - 1) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      p.append(a);
      textCell.push(p);
    }

    // Each row: [image cell, text cell]
    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
  element.replaceWith(block);
}
