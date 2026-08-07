/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq.
 * Base block: accordion (2 columns; each row = one item: cell 1 title, cell 2 content).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: .faq-pg article.faq-wrapper (union with article.faq-wrapper)
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/accordion-faq/source.html):
 *   <article class="... faq-wrapper">
 *     <div class="container"><div class="wrapper">
 *       <h3>Have queries? Read FAQs</h3>               <- section heading (default content, preserved)
 *       <div class="accordion">
 *         <div class="accordion-item">
 *           <h2 class="accordion-header">What are the features...?</h2>   <- question (title cell)
 *           <div class="accordion-content">
 *             <div class="accordionContentBox"><p><strong>...</strong></p></div>  <- answer (content cell)
 *         ...  (3 Q&A pairs)
 *     <div class="moreBtnBox"><a class="white-btn-sm">View More</a></div>   <- View More (default content, preserved)
 *
 * Library convention (accordion): 2 columns. Cell 1 = question title; Cell 2 =
 * answer content. One row per Q&A pair. The section <h3> heading and the trailing
 * "View More" control are default content (page-templates.json rc6.defaultContent)
 * and are lifted out as siblings so they survive the import instead of being
 * consumed into the block.
 */
export default function parse(element, { document }) {
  // Section heading + "View More" — default content, kept outside the block.
  const sectionHeading = element.querySelector('h3');
  const viewMore = element.querySelector('.moreBtnBox');

  // One row per accordion item.
  const items = Array.from(element.querySelectorAll('.accordion-item'));

  const cells = [];
  items.forEach((item) => {
    // Title cell: the question header.
    const question = item.querySelector('.accordion-header, h2, h3, h4');

    // Content cell: the answer body (prefer the inner content box).
    const answer = item.querySelector('.accordionContentBox')
      || item.querySelector('.accordion-content')
      || item.querySelector(':scope > div:last-child');

    if (question || answer) {
      cells.push([question || '', answer || '']);
    }
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });

  // Preserve default content: heading before the block, "View More" after.
  const replacements = [];
  if (sectionHeading) replacements.push(sectionHeading);
  replacements.push(block);
  if (viewMore) replacements.push(viewMore);
  element.replaceWith(...replacements);
}
