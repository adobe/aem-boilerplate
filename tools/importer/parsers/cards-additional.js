/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-additional.
 * Base block: cards (2 columns; each row = one card: cell 1 icon, cell 2 text).
 * Source: https://www.bobcard.co.in/credit-card-types/eterna
 * Selector: article.benefit-eterna.additional-benefit
 * Generated: 2026-08-07
 *
 * Source structure (verified in migration-work/block-context/cards-additional/source.html):
 *   <article class="benefit-eterna additional-benefit">
 *     <div class="container"><div class="wrapper">
 *       <h2>Additional Benefits with ETERNA</h2>            <- section heading (default content, preserved)
 *       <ul class="benefits">
 *         <div class="slick-slider additionalBenefitsSlider ...">
 *           <button class="slick-arrow ...">Previous</button>   <- slider control (dropped)
 *           ...<li>
 *                <div class="img-wrap ..."><img alt="..." src="..."></div>  <- icon
 *                <h3>Milestone Rewards</h3>                                 <- card title
 *                <div><p>...</p></div>                                      <- description
 *              </li>...  (9 items)
 *           <button class="slick-arrow slick-next">Next</button>            <- slider control (dropped)
 *       </ul>
 *       <div class="disclaimer_descrip ...">...Read more</div>  <- disclaimer (default content, preserved)
 *     ...
 *     <div class="disclaimer_popup">...</div>                  <- hidden JS modal duplicate (dropped)
 *
 * The nine benefits render in a slick slider; slick clones slides for looping
 * (`.slick-cloned`), which are excluded so each benefit appears once. The section
 * <h2> and the trailing `.disclaimer_descrip` are default content
 * (page-templates.json rc4.defaultContent) and are lifted out as siblings so they
 * survive the import. The hidden `.disclaimer_popup` is a JS-driven duplicate of
 * the disclaimer (not authored content) and is intentionally not emitted.
 *
 * Library convention (cards): 2 columns. Cell 1 = icon image; Cell 2 = title +
 * description. One row per card.
 */
export default function parse(element, { document }) {
  // Section heading + disclaimer — default content, kept outside the block.
  const sectionHeading = element.querySelector('h2');
  const disclaimer = element.querySelector('.disclaimer_descrip');

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
    const img = li.querySelector('.img-wrap img, img');

    const content = [];
    const title = li.querySelector('h3');
    if (title) content.push(title);
    li.querySelectorAll('p').forEach((p) => {
      if (p.textContent.trim()) content.push(p);
    });
    // Real CTA links only (skip hrefless JS toggles). Inline links inside a
    // paragraph are already carried by that <p>, so add only standalone anchors.
    li.querySelectorAll(':scope a[href]').forEach((a) => {
      if (!content.some((el) => el === a || (el.contains && el.contains(a)))) {
        content.push(a);
      }
    });

    if (img || content.length) {
      cells.push([img || '', content.length ? content : '']);
    }
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-additional', cells });

  // Preserve default content: heading before the block, disclaimer after.
  const replacements = [];
  if (sectionHeading) replacements.push(sectionHeading);
  replacements.push(block);
  if (disclaimer) replacements.push(disclaimer);
  element.replaceWith(...replacements);
}
