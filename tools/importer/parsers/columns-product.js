/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-product.
 * Base block: columns (1 content row; each cell becomes a column).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: article.feature-benefit
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/columns-product/source.html):
 *   <article class="feature-benefit">
 *     <div class="container"><div class="wrapper">
 *       <div class="row align-items-center">
 *         <div class="col-md-4"><img class="feature-benefit-img" ...></div>   <- col 1: card image
 *         <div class="col-md-5 feature-content">                              <- col 2
 *           <h2>Designed for high-performers...</h2>
 *           <p>Be it a lifestyle upgrade...</p>
 *           <a class="orange-btn-sm" href="https://mycard.bobcard.tech/...">Apply Now</a>
 *         </div>
 *         <div class="col-md-3 col-6 ...">                                    <- col 3
 *           <h4>Just ₹2499 in Joining & Annual Fees...</h4>
 *           <div class="blinking-text">Limited Period Lifetime Free Card Offer.</div>
 *           <a class="orange-btn-sm" href="/most-important-terms-and-condition">Check MITC</a>
 *         </div>
 *
 * Library convention (columns): one content row whose cells become side-by-side
 * columns. The source's three `.row > div` columns map directly to three cells.
 * The natural grouping (image | copy+CTA | fee+CTA) is taken from the source
 * column structure, one cell per source column.
 */
export default function parse(element, { document }) {
  // The three visual columns are the direct children of `.row`.
  const row = element.querySelector('.row');
  let columns = row
    ? Array.from(row.children)
    : Array.from(element.querySelectorAll('.wrapper > *'));

  // Accessibility: the source's fee column uses an <h4> that directly follows
  // the intro <h2>, skipping h3 (a WCAG heading-order flag). Promote every h4
  // in this block to h3 up front so the hierarchy is h2 -> h3 with no skipped
  // level. Done before cells are collected so the emitted table references the
  // new h3 nodes. Text is unchanged; block CSS controls the visual size.
  element.querySelectorAll('h4').forEach((h4) => {
    const h3 = document.createElement('h3');
    h3.innerHTML = h4.innerHTML;
    h4.replaceWith(h3);
  });

  // Build one cell per source column, preserving each column's inner content
  // (headings, paragraphs, notes, buttons) as-is.
  const cells = [];
  const rowCells = [];
  columns.forEach((col) => {
    const cellContent = [];
    // Image column: keep the image.
    const img = col.querySelector('img');
    if (img && col.children.length === 1 && col.firstElementChild === img) {
      cellContent.push(img);
    } else {
      // Text/CTA column: keep all meaningful children in document order.
      Array.from(col.children).forEach((child) => {
        if (child.textContent.trim() || child.querySelector('img, a')) {
          cellContent.push(child);
        }
      });
      // Fallback: if the column had no element children, keep the image if any.
      if (!cellContent.length && img) cellContent.push(img);
    }
    if (cellContent.length) rowCells.push(cellContent.length === 1 ? cellContent[0] : cellContent);
  });

  // Empty-block guard.
  if (!rowCells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push(rowCells);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-product', cells });
  element.replaceWith(block);
}
