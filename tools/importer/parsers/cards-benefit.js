/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-benefit.
 * Base block: cards (2 columns; each row = one card: cell 1 image, cell 2 text).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: .CardBenefitesWrapp article.benefit-eterna
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/cards-benefit/source.html):
 *   <article class="benefit-eterna">
 *     <div class="container"><div class="wrapper">
 *       <h2>Discover how it fits your lifestyle</h2>   <- section heading (default content, preserved)
 *       <ul>
 *         <div class="slick-slider benefitsSlider ...">   <- slick carousel
 *           ...<li>
 *                <div class="img-wrap ..."><img alt="..." src="..."></div>  <- icon
 *                <h3>Dining Experiences</h3>                                <- card title
 *                <div class="jsx-..."><p>...</p></div>                      <- description (may contain inline links)
 *                <a class="read-more-btn">Read more</a>                     <- JS toggle (no href) -> dropped
 *              </li>...
 *
 * The source renders the three benefits in a slick slider. On the live page slick
 * clones slides for looping (`.slick-cloned`); those are excluded so each benefit
 * appears exactly once. The section <h2> is default content (see page-templates.json
 * rc3.defaultContent) and is lifted out as a sibling so it survives the import
 * instead of being consumed into the block.
 *
 * Library convention (cards): 2 columns. Cell 1 = icon image; Cell 2 = title +
 * description (+ optional CTA). One row per card.
 */
export default function parse(element, { document }) {
  // Section heading — default content, not part of the cards block.
  const sectionHeading = element.querySelector('h2');

  // Card items. Exclude slick's cloned slides so each card appears once.
  let items = Array.from(element.querySelectorAll('li'))
    .filter((li) => !li.closest('.slick-cloned'));

  // Defensive de-dup by title text in case the slider duplicated markup
  // without the .slick-cloned marker.
  const seen = new Set();
  items = items.filter((li) => {
    const title = (li.querySelector('h3')?.textContent || '').trim().toLowerCase();
    const key = title || li.textContent.trim().slice(0, 60).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const cells = [];
  items.forEach((li) => {
    // Cell 1: icon image (prefer the one inside the image wrapper).
    const img = li.querySelector('.img-wrap img, img');

    // Cell 2: title + description paragraphs (inline links preserved).
    const content = [];
    const title = li.querySelector('h3');
    if (title) content.push(title);
    li.querySelectorAll('p').forEach((p) => {
      if (p.textContent.trim()) content.push(p);
    });
    // Real CTA links only (skip hrefless JS "Read more" toggles).
    li.querySelectorAll(':scope a[href]').forEach((a) => {
      if (!content.includes(a) && !content.some((el) => el.contains && el.contains(a))) {
        content.push(a);
      }
    });

    // Only emit a card row when it has content; pad missing cells so every row
    // has the same 2-column shape.
    if (img || content.length) {
      cells.push([img || '', content.length ? content : '']);
    }
  });

  // Empty-block guard: no cards found -> unwrap, leaving original content in place.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-benefit', cells });

  // Preserve the section heading (default content) ahead of the block.
  const replacements = [];
  if (sectionHeading) replacements.push(sectionHeading);
  replacements.push(block);
  element.replaceWith(...replacements);
}
