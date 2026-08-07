/* eslint-disable */
/* global WebImporter */

/**
 * Site-wide cleanup transformer for bobcard.co.in (Next.js React site).
 *
 * Removes non-authorable site chrome so the import contains only page-level
 * authorable content. All selectors below were verified against
 * migration-work/cleaned.html for the credit-card-product template
 * (source: https://www.bobcard.co.in/credit-card-types/eterna).
 *
 * Verified selectors (with cleaned.html line references):
 *   - div.Headerwrapp        -> global header/nav/search/mobile-menu (line 2)
 *   - footer                 -> global site footer (line 558)
 *   - next-route-announcer   -> Next.js a11y route announcer artifact (line 556)
 *   - div.progress-wrap      -> scroll progress / back-to-top widget (line 157)
 *
 * None of these are authored per page; they are populated by the site shell.
 * They are removed in afterTransform because they sit outside the block
 * content wrappers and do not affect block parsing.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome (selectors verified in cleaned.html)
    WebImporter.DOMUtils.remove(element, [
      '.Headerwrapp', // global header wrapper (contains <header>, <nav>, mobile menu, search)
      'footer', // global site footer
      'next-route-announcer', // Next.js route-change a11y live region
      '.progress-wrap', // scroll progress / back-to-top widget
    ]);
  }
}
