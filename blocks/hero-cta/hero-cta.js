/**
 * hero-cta — promotional CTA banner.
 *
 * Authored structure (rows):
 *   row 1: banner image
 *   row 2: heading + description + offer note + "Apply Now" CTA
 *
 * The image is rendered as a full-bleed background and the text is overlaid
 * on top, matching the source "The good life awaits!" banner.
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Identify the image row (a row whose only meaningful content is a picture)
  const imageRow = rows.find((row) => row.querySelector('picture')
    && !row.querySelector('h1, h2, h3, h4, h5, h6'));
  // The content row is the first row that has a heading (or the remaining row).
  const contentRow = rows.find((row) => row !== imageRow
    && (row.querySelector('h1, h2, h3, h4, h5, h6, p, a')));

  if (imageRow) {
    imageRow.classList.add('hero-cta-image');
    block.classList.add('has-image');
  }

  if (contentRow) {
    contentRow.classList.add('hero-cta-content');

    // Flag the standalone "Limited Period..." offer note (a plain paragraph
    // that is neither the lead description nor a link) so it can be styled
    // as the orange offer callout.
    const paras = [...contentRow.querySelectorAll(':scope > div > p, :scope > p')];
    paras.forEach((p) => {
      const hasLink = p.querySelector('a');
      const text = p.textContent.trim();
      if (!hasLink && /free card offer/i.test(text)) {
        p.classList.add('note');
      }
    });

    // Buttonize standalone CTA links ("Apply Now"). The project's global
    // decorateButtons only styles links wrapped in <strong>/<em>, so promote
    // single-child paragraph links to the global orange pill button here.
    contentRow.querySelectorAll('p > a[href]').forEach((a) => {
      const p = a.parentElement;
      if (p.childElementCount === 1 && p.textContent.trim() === a.textContent.trim()) {
        p.classList.add('button-wrapper');
        a.classList.add('button');
      }
    });
  }
}
