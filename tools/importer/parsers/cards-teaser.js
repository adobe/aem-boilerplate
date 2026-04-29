/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-teaser variant.
 * Base block: cards
 * Source: https://www.meag.com/index_en.html
 * Selector: .full-width-image-text-teaser
 * Generated: 2026-04-29
 *
 * Extracts a full-width teaser section with heading, description text,
 * and CTA button into a Cards (Teaser) block table with a single card row.
 */
export default function parse(element, { document }) {
  // Extract heading (h2 with class full-width-image-text-teaser__headline, fallback to any h2/h3)
  const heading = element.querySelector('h2.full-width-image-text-teaser__headline, h2, h3');

  // Extract description text paragraph
  const textContainer = element.querySelector('.full-width-image-text-teaser__text');
  const description = textContainer
    ? textContainer.querySelector('p')
    : element.querySelector('.full-width-image-text-teaser__content-wrapper p');

  // Extract CTA link/button
  const ctaLink = element.querySelector('.full-width-image-text-teaser__button a, a.meag-button, a.link');

  // Extract background/feature image if present (may be empty in some instances)
  const image = element.querySelector('.full-width-image-text-teaser__image-wrapper img, img');

  // Build a single container div with heading + description + CTA as one cell
  const contentContainer = document.createElement('div');

  if (image) {
    contentContainer.append(image);
  }

  if (heading) {
    contentContainer.append(heading);
  }

  if (description) {
    contentContainer.append(description);
  }

  if (ctaLink) {
    // Wrap CTA link in a paragraph for proper formatting
    const ctaParagraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.append(ctaLink);
    ctaParagraph.append(strong);
    contentContainer.append(ctaParagraph);
  }

  // Build cells array: single card row with single cell containing all content
  const cells = [];
  if (contentContainer.children.length > 0) {
    cells.push([[contentContainer]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-teaser', cells });
  element.replaceWith(block);
}
