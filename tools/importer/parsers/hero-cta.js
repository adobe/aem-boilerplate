/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-cta.
 * Base block: hero (1 column; rows: name / background image / content).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: article.transaction-banner
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/hero-cta/source.html):
 *   <article class="transaction-banner mb-5">
 *     <div class="container"><div class="wrapper">
 *       <img src="...jpg">                              <- background/lifestyle image
 *       <h2 class="col-lg-8">The good life awaits!</h2>  <- heading
 *       <p class="my-4 col-lg-6"><p>Reviewed as one of the best...</p></p>  <- paragraph (source has
 *                                                          malformed nested <p>; the browser flattens
 *                                                          it, so we collect all non-empty paragraphs)
 *       <div class="blinking-text">Limited Period Lifetime Free Card Offer.</div>  <- note
 *       <a class="orange-btn-sm" href="https://mycard.bobcard.tech/...">Apply Now</a>  <- CTA
 *
 * Library convention (hero): 1 column. Row 2 = background image (optional).
 * Row 3 = title + subheading/paragraph + note + CTA. All row-3 content lives in a
 * single cell.
 *
 * Background image note: the scraped source.html carries a real <img>, but on the
 * live page the banner background is a CSS `background: url(...)` inline style on
 * `.wrapper` (no <img> element). To capture it in both renderings, we use the
 * <img> when present and otherwise synthesize one from the inline background URL.
 */
export default function parse(element, { document }) {
  const wrapper = element.querySelector('.wrapper') || element;

  // Row 2: background image. Prefer a real <img>; fall back to the CSS
  // background-image URL declared inline on the wrapper/article.
  let bgImage = element.querySelector('img');
  if (!bgImage) {
    let bgUrl = '';
    for (const node of [wrapper, element]) {
      const style = node.getAttribute && node.getAttribute('style');
      const match = style && style.match(/url\((['"]?)([^'")]+)\1\)/i);
      if (match) { bgUrl = match[2]; break; }
    }
    if (bgUrl) {
      bgImage = document.createElement('img');
      bgImage.src = bgUrl;
      const heading = element.querySelector('h1, h2, h3');
      bgImage.alt = heading ? heading.textContent.trim() : '';
    }
  }

  // Row 3 content (single cell): heading, paragraph(s), note, CTA — in order.
  const contentCell = [];

  const heading = element.querySelector('h1, h2, h3');
  if (heading) contentCell.push(heading);

  // Paragraph text. The source nests <p> inside <p>; grab the innermost
  // non-empty paragraphs to avoid duplicate/empty entries.
  const paragraphs = Array.from(element.querySelectorAll('p'))
    .filter((p) => p.textContent.trim() && !p.querySelector('p'));
  paragraphs.forEach((p) => contentCell.push(p));

  // Limited-offer note.
  const note = element.querySelector('.blinking-text');
  if (note && note.textContent.trim()) contentCell.push(note);

  // CTA link (with href).
  const cta = element.querySelector('a[href]');
  if (cta && !contentCell.some((el) => el === cta || (el.contains && el.contains(cta)))) {
    contentCell.push(cta);
  }

  // Empty-block guard.
  if (!bgImage && !contentCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  // Row 2: background image (only if present).
  if (bgImage) cells.push([bgImage]);
  // Row 3: content (single cell holding all elements).
  if (contentCell.length) cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}
