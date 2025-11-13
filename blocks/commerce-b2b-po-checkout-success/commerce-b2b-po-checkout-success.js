/* eslint-disable import/no-unresolved */

// Tools and initializers
import { Button, provider as UI } from '@dropins/tools/components.js';

// Purchase Order Dropin
import PurchaseOrderConfirmation from '@dropins/storefront-purchase-order/containers/PurchaseOrderConfirmation.js';
import { render as POProvider } from '@dropins/storefront-purchase-order/render.js';

// Checkout API/utils
import { createFragment, createScopedSelector } from '@dropins/storefront-checkout/lib/utils.js';

// Commerce helpers
import { rootLink, CUSTOMER_PO_DETAILS_PATH } from '../../scripts/commerce.js';
import { loadCSS } from '../../scripts/aem.js';

// Initialize dropins
import '../../scripts/initializers/purchase-order.js';

// ----------------------------------------------------------------------------
// Local selectors and fragments (order confirmation only)
// ----------------------------------------------------------------------------

const selectors = Object.freeze({
  poConfirmation: {
    content: '.po-confirmation__content',
    footer: '.po-confirmation__footer',
    continueButton: '.po-confirmation-footer__continue-button',
  },
});

function createPOConfirmationFragment() {
  return createFragment(`
    <div class="po-confirmation">
      <div class="po-confirmation__content"></div>
      <div class="po-confirmation__footer"></div>
    </div>
  `);
}

// ----------------------------------------------------------------------------
// Local renderers (order confirmation only)
// ----------------------------------------------------------------------------

async function renderPOConfirmationContainer(container, poNumber, poUid) {
  return POProvider.render(PurchaseOrderConfirmation, {
    purchaseOrderNumber: poNumber,
    routePurchaseOrderDetails: () => rootLink(`${CUSTOMER_PO_DETAILS_PATH}?poRef=${poUid}`),
  })(container);
}

async function renderPOConfirmationFooterButton(container) {
  UI.render(Button, {
    children: 'Continue shopping',
    'data-testid': 'po-confirmation-footer__continue-button',
    className: 'po-confirmation-footer__continue-button',
    size: 'medium',
    variant: 'primary',
    type: 'submit',
    href: rootLink('/'),
  })(container);
}

async function renderPOConfirmationContent(container, poData = {}) {
  // Scroll to the top of the page
  window.scrollTo(0, 0);

  // Create a purchase order confirmation layout using fragments
  const poConfirmationFragment = createPOConfirmationFragment();

  // Create a scoped selector for PO confirmation fragment (following a multistep pattern)
  const getPOElement = createScopedSelector(poConfirmationFragment);

  // Get all PO confirmation elements using centralized selectors
  const $poConfirmationContent = getPOElement(selectors.poConfirmation.content);
  const $poConfirmationFooter = getPOElement(selectors.poConfirmation.footer);

  container.replaceChildren(poConfirmationFragment);

  await Promise.all([
    renderPOConfirmationContainer($poConfirmationContent, poData?.number, poData?.uid),
    renderPOConfirmationFooterButton($poConfirmationFooter),
  ]);
}

export async function renderPOSuccess(container, poData) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/commerce-b2b-po-checkout-success/commerce-b2b-po-checkout-success.css`);
  return renderPOConfirmationContent(container, poData);
}

export default async function decorate(block) {
  await renderPOConfirmationContent(block);
}
