/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-eterna.
 * Base block: hero (1 column, rows: name / background image / content).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: .CardBannersWrapp article.card_banner (union with article.card_banner)
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/hero-eterna/source.html):
 *   <article class="card_banner">
 *     <a href="https://mycard.bobcard.tech/...">   <- destination (Apply Now baked into artwork)
 *       <img alt="Bob Eterna Credit Card" src="...eterna-credit-card...jpg">
 *     </a>
 *   </article>
 *
 * Library convention (hero): row 2 = Background Image (optional), row 3 = Title/Subheading/CTA (optional).
 * The headline and CTA are baked into the banner artwork, so there is no separate
 * text row — row 2 carries the linked banner image (link preserved so the
 * destination href round-trips through the import), row 3 is omitted.
 */
export default function parse(element, { document }) {
  // The full-bleed banner is a single linked image. Prefer the anchor so the
  // click destination (href) is preserved; fall back to the bare image.
  const link = element.querySelector('a[href]');
  const img = element.querySelector('img');

  // Empty-block guard: nothing to render without an image.
  if (!img) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Background image cell — keep the image wrapped in its destination link when present.
  const backgroundContent = link && link.contains(img) ? link : img;

  const cells = [];
  // Row 2: background image (single-column → one row, one cell).
  cells.push([backgroundContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-eterna', cells });
  element.replaceWith(block);
}
