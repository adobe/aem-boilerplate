/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-steps.
 * Base block: cards — "no images" variant (1 column; each row = one step card).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: article.document-req
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/cards-steps/source.html):
 *   <article class="document-req">
 *     <div class="container"><div class="wrapper">
 *       <h2>Application Guidelines</h2>            <- section heading (default content, preserved)
 *       <p>Understand just what you need...</p>    <- intro paragraph (default content, preserved)
 *       <div class="pointers d-flex ...">
 *         <div class="d-flex align-items-top">     <- one step
 *           <h3>1</h3>                             <- prominent step number
 *           <div class="step-wrap">
 *             <h4>Eligibility Criteria</h4>        <- step title
 *             <div><div><p>...</p>...</div>        <- description paragraphs
 *               <a class="read-more def-href">Read more</a>  <- JS toggle (no href) -> dropped
 *
 * These four steps have NO icon/image, so the "Cards (no images)" convention
 * applies: 1 column, one row per card, each cell holding the number heading, the
 * title heading, and the description paragraphs. The section <h2> and intro <p>
 * are default content (page-templates.json rc5.defaultContent) and are lifted out
 * as siblings so they survive the import instead of being consumed into the block.
 */
export default function parse(element, { document }) {
  // Section heading + intro paragraph — default content, kept outside the block.
  const sectionHeading = element.querySelector('h2');
  const intro = element.querySelector(':scope > .container > .wrapper > p, .wrapper > p');

  // Each step is a direct child of .pointers.
  const steps = Array.from(element.querySelectorAll('.pointers > div'));

  const cells = [];
  steps.forEach((step) => {
    const contentCell = [];

    // Prominent step number (heading).
    const number = step.querySelector('h3');
    if (number && number.textContent.trim()) contentCell.push(number);

    // Step title (heading).
    const title = step.querySelector('h4');
    if (title) contentCell.push(title);

    // Description paragraphs (skip empty ones).
    step.querySelectorAll('.step-wrap p, p').forEach((p) => {
      if (p.textContent.trim() && !contentCell.includes(p)) contentCell.push(p);
    });

    // Real CTA links only (skip hrefless JS "Read more" toggles).
    step.querySelectorAll('a[href]').forEach((a) => {
      if (!contentCell.some((el) => el === a || (el.contains && el.contains(a)))) {
        contentCell.push(a);
      }
    });

    if (contentCell.length) {
      // 1-column card: one row, one cell holding all elements.
      cells.push([contentCell]);
    }
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-steps', cells });

  // Preserve default content: heading + intro before the block.
  const replacements = [];
  if (sectionHeading) replacements.push(sectionHeading);
  if (intro) replacements.push(intro);
  replacements.push(block);
  element.replaceWith(...replacements);
}
