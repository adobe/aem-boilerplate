/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: MEAG site-wide cleanup.
 * Removes non-authorable elements from the MEAG homepage.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie disclaimer overlay (line 1793 in cleaned.html: <div id="cookieDisclaimer" class="is-visible">)
    // Remove SVG sprite container (line 2: <div id="sprite-plyr">)
    // Remove disclaimer/fraud warning banner (line 1373: <div class="disclaimer-banner">)
    WebImporter.DOMUtils.remove(element, [
      '#cookieDisclaimer',
      '#sprite-plyr',
      '.disclaimer-banner',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header navigation (line 9: <header class="js-header">)
    // Remove flyout navigation wrapper (line 62: <div id="flyoutWrapperDOM">)
    // Remove mobile flyout navigation (line 663: <div class="mobile-flyout">)
    // Remove breadcrumbs (line 1355: <div class="breadcrumbs__outer-wrapper">)
    // Remove footer (line 1706: <footer>)
    WebImporter.DOMUtils.remove(element, [
      '.js-header',
      '#flyoutWrapperDOM',
      '.mobile-flyout',
      '.breadcrumbs__outer-wrapper',
      'footer',
    ]);
  }
}
