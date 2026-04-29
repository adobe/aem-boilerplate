/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-quotes
 * Base block: carousel
 * Source: https://www.meag.com/index_en.html
 * Selector: .sliderCite
 * Generated: 2026-04-29
 *
 * Extracts employee quote carousel from MEAG homepage.
 * Source structure: .sliderCite container with h2 heading and multiple
 * .image-with-quote items, each containing a portrait image, blockquote
 * with quote text (.blockquote__quote), and citation (.blockquote__cite).
 *
 * Target: "carousel-quotes" block table with one row per quote.
 * Each row has two cells: [image] | [quote text + citation name]
 */
export default function parse(element, { document }) {
  // Extract the section heading
  const heading = element.querySelector('h2.sliderCite__headline, h2, .sliderCite__headline');

  // Extract all quote items
  const quoteItems = Array.from(element.querySelectorAll('.image-with-quote'));

  const cells = [];

  // First row: heading (if present)
  if (heading) {
    cells.push([heading]);
  }

  // One row per quote item: [image] | [quote text + citation]
  quoteItems.forEach((item) => {
    // Portrait image - get the actual photo, not the decorative SVG line
    const portraitImg = item.querySelector(':scope > img, .image-with-quote > img');

    // Quote text
    const quoteText = item.querySelector('p.blockquote__quote, .blockquote__quote');

    // Citation name
    const citeName = item.querySelector('cite.blockquote__cite, .blockquote__cite');

    // Build the content cell with quote text and citation
    const contentCell = [];
    if (quoteText) contentCell.push(quoteText);
    if (citeName) contentCell.push(citeName);

    // Build the row: image cell | content cell
    const imageCell = portraitImg ? [portraitImg] : [];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-quotes', cells });
  element.replaceWith(block);
}
