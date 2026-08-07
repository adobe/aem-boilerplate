/* eslint-disable */
/* global WebImporter */

/**
 * Section transformer for the bobcard.co.in credit-card-product template.
 *
 * Adds EDS section breaks (<hr>) and Section Metadata blocks based on the
 * section boundaries defined in tools/importer/page-templates.json.
 *
 * Runs in afterTransform only (block parsers run between the hooks; sections
 * are a final structural pass over the parsed content).
 *
 * Section boundary selectors (all verified against migration-work/cleaned.html):
 *   rc1 Hero Banner            -> .CardBannersWrapp                       (first section, no <hr>)
 *   rc2 Page Heading           -> h1.headingtext_headingH1Text__XffKe
 *   rc3 Card Benefits          -> .CardBenefitesWrapp        style: light-grey
 *   rc4 Additional Benefits    -> .AdditionalBenefitsWrapp
 *   rc5 Application Guidelines -> .ApplicationGuidelinesWrapp
 *   rc6 FAQ                    -> .faq-pg.rupayFaq
 *
 * Expected output for this template: 5 <hr> (sections.length - 1) and
 * 1 Section Metadata block (only rc3 defines a style).
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;

  const template = payload && payload.template;
  const sections = template && Array.isArray(template.sections) ? template.sections : [];
  if (sections.length < 2) return;

  const doc = (payload && payload.document) || element.ownerDocument;

  // Resolve each section's boundary element from its selector(s).
  const resolved = sections.map((section) => {
    const selectors = Array.isArray(section.selector)
      ? section.selector
      : [section.selector].filter(Boolean);
    let el = null;
    for (const sel of selectors) {
      if (!sel) continue;
      el = element.querySelector(sel);
      if (el) break;
    }
    return { section, el };
  });

  // Process in reverse so earlier insertions do not shift later boundaries.
  for (let i = resolved.length - 1; i >= 0; i -= 1) {
    const { section, el } = resolved[i];
    if (!el) continue;

    // Section Metadata block for sections that declare a style. Insert it at
    // the end of the section's content (immediately after the boundary
    // element) so it applies to this section.
    if (section.style) {
      const smBlock = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      el.insertAdjacentElement('afterend', smBlock);
    }

    // Section break before every non-first section (one <hr> per boundary
    // except the first section).
    if (i > 0) {
      const hr = doc.createElement('hr');
      el.insertAdjacentElement('beforebegin', hr);
    }
  }
}
