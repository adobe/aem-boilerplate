/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: MEAG section breaks.
 * Inserts <hr> section dividers based on template sections from page-templates.json.
 * All selectors verified against migration-work/cleaned.html:
 *   - .stageHome (line 1400)
 *   - .text-with-initial (line 1476, inside grid-content-wrapper)
 *   - .videoplayer (line 1491)
 *   - .sliderCite (line 1548, inside grid-content-wrapper)
 *   - .full-width-image-text-teaser (line 1611, inside grid-content-wrapper)
 *   - .quickNavigation (line 1630, inside grid-content-wrapper)
 *   - .image-text-teaser (line 1667, inside grid-content-wrapper)
 *
 * No sections have a style property, so no Section Metadata blocks are created.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid offset issues when inserting <hr>
    const reversedSections = [...sections].reverse();
    for (const section of reversedSections) {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Insert <hr> before every section except the first
      if (section !== sections[0]) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
