/* eslint-disable import/no-unresolved */

import { Button, provider as UI } from '@dropins/tools/components.js';
import { initializers } from '@dropins/tools/initializer.js';
import { events } from '@dropins/tools/event-bus.js';

import * as orderApi from '@dropins/storefront-order/api.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';

import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

import '../../scripts/initializers/order.js';

// Order numbers are alphanumeric (with -/_ allowed). Keep the bound permissive
// enough for any backend format but tight enough to reject URL garbage.
export const ORDER_NUMBER_REGEX = /^[A-Za-z0-9_-]{4,32}$/;

export function extractOrderNumber(search) {
  const raw = new URLSearchParams(search).get('order');
  if (raw === null) return { status: 'missing' };
  const orderNumber = raw.trim();
  if (orderNumber === '') return { status: 'missing' };
  if (!ORDER_NUMBER_REGEX.test(orderNumber)) return { status: 'malformed' };
  return { status: 'valid', orderNumber };
}

// /pay block hands us the full order via history.state on a successful
// payment. The dropin's orderApi.initialize accepts the same shape that
// payByLinkOrder returns, so no transformation is needed — we just forward it.
function consumeOrderDataFromHistory(expectedOrderNumber) {
  const { state } = window.history;
  const orderData = state && typeof state === 'object' ? state.orderData : undefined;
  if (!orderData) return null;
  // The URL's order_number is the ground truth. orderData must carry the same
  // number; anything else is mismatched navigation or tampered state, in which
  // case we fall back to the thank-you view.
  if (orderData.number !== expectedOrderNumber) return null;
  return orderData;
}

function renderError(block, kind, labels) {
  const ns = labels?.PayByLinkConfirmation || {};
  const isMissing = kind === 'missing';
  const title = isMissing ? ns.ErrorMissingOrderTitle : ns.ErrorMalformedOrderTitle;
  const body = isMissing ? ns.ErrorMissingOrderBody : ns.ErrorMalformedOrderBody;

  block.innerHTML = `
    <div class="pay-by-link-confirmation pay-by-link-confirmation--error">
      <div class="pay-by-link-confirmation__error-card" role="alert" aria-live="assertive">
        <h1 class="pay-by-link-confirmation__error-title" tabindex="-1"></h1>
        <p class="pay-by-link-confirmation__error-body"></p>
        <div class="pay-by-link-confirmation__error-cta"></div>
      </div>
    </div>
  `;

  block.querySelector('.pay-by-link-confirmation__error-title').textContent = title || '';
  block.querySelector('.pay-by-link-confirmation__error-body').textContent = body || '';

  UI.render(Button, {
    children: ns.ErrorContinueShoppingLabel || '',
    variant: 'primary',
    size: 'medium',
    href: rootLink('/'),
    'data-testid': 'pay-by-link-confirmation-error-cta',
  })(block.querySelector('.pay-by-link-confirmation__error-cta'));
  setTimeout(() => {
    block.querySelector('.pay-by-link-confirmation__error-title')?.focus();
  }, 0);
}

// Successful payment, leaner view: the order_number is known but we don't have
// the order object needed to mount the storefront-order containers (e.g.
// refresh, direct nav, link from email dropped the history.state handoff).
// Renders thank-you + order number + CTA — the confirmation email is the
// durable record of the full transaction.
function renderThankYou(block, orderNumber, labels) {
  const ns = labels?.PayByLinkConfirmation || {};

  block.innerHTML = `
    <div class="pay-by-link-confirmation pay-by-link-confirmation--thank-you">
      <div class="pay-by-link-confirmation__thank-you-card">
        <h1 class="pay-by-link-confirmation__thank-you-title" tabindex="-1"></h1>
        <p class="pay-by-link-confirmation__thank-you-order-number">
          <span class="pay-by-link-confirmation__thank-you-order-number-label"></span>
          <strong class="pay-by-link-confirmation__thank-you-order-number-value" data-testid="pay-by-link-confirmation-order-number"></strong>
        </p>
        <p class="pay-by-link-confirmation__thank-you-body"></p>
        <div class="pay-by-link-confirmation__thank-you-cta"></div>
      </div>
    </div>
  `;

  block.querySelector('.pay-by-link-confirmation__thank-you-title').textContent = ns.ThankYouTitle || '';
  block.querySelector('.pay-by-link-confirmation__thank-you-order-number-label').textContent = ns.OrderNumberLabel || '';
  block.querySelector('.pay-by-link-confirmation__thank-you-order-number-value').textContent = orderNumber;
  block.querySelector('.pay-by-link-confirmation__thank-you-body').textContent = ns.ThankYouBody || '';

  UI.render(Button, {
    children: ns.ContinueShoppingLabel || '',
    variant: 'primary',
    size: 'medium',
    href: rootLink('/'),
    'data-testid': 'pay-by-link-confirmation-continue-cta',
  })(block.querySelector('.pay-by-link-confirmation__thank-you-cta'));

  setTimeout(() => {
    block.querySelector('.pay-by-link-confirmation__thank-you-title')?.focus();
  }, 0);
}

async function renderFullSummary(block, orderData, labels) {
  block.innerHTML = `
    <div class="pay-by-link-confirmation">
      <div class="pay-by-link-confirmation__main">
        <div class="pay-by-link-confirmation__order-header pay-by-link-confirmation__block"></div>
        <div class="pay-by-link-confirmation__order-status pay-by-link-confirmation__block"></div>
        <div class="pay-by-link-confirmation__customer-details pay-by-link-confirmation__block"></div>
      </div>
      <aside class="pay-by-link-confirmation__aside">
        <div class="pay-by-link-confirmation__order-cost-summary pay-by-link-confirmation__block"></div>
        <div class="pay-by-link-confirmation__order-product-list pay-by-link-confirmation__block"></div>
      </aside>
    </div>
  `;

  const langDefinitions = { default: { ...labels } };
  await initializers.mountImmediately(orderApi.initialize, { langDefinitions, orderData });

  await Promise.all([
    OrderProvider.render(OrderHeader, { orderData })(
      block.querySelector('.pay-by-link-confirmation__order-header'),
    ),
    OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(
      block.querySelector('.pay-by-link-confirmation__order-status'),
    ),
    OrderProvider.render(CustomerDetails)(
      block.querySelector('.pay-by-link-confirmation__customer-details'),
    ),
    OrderProvider.render(OrderCostSummary)(
      block.querySelector('.pay-by-link-confirmation__order-cost-summary'),
    ),
    OrderProvider.render(OrderProductList)(
      block.querySelector('.pay-by-link-confirmation__order-product-list'),
    ),
  ]);
}

export default async function decorate(block) {
  const result = extractOrderNumber(window.location.search);

  if (result.status !== 'valid') {
    const labels = await fetchPlaceholders();
    renderError(block, result.status, labels);
    return;
  }

  events.emit('pay-by-link/confirmation', { orderNumber: result.orderNumber });

  const orderData = consumeOrderDataFromHistory(result.orderNumber);
  const labels = await fetchPlaceholders();

  if (orderData) {
    try {
      await renderFullSummary(block, orderData, labels);
      return;
    } catch (e) {
      // orderData shape didn't satisfy the dropin (initialize or a container
      // render threw). Fall back to thank-you — a customer who has already paid
      // should never see a broken page.
      // eslint-disable-next-line no-console
      console.error('Pay By Link confirmation: full-summary render failed, falling back to thank-you.', e);
    }
  }

  renderThankYou(block, result.orderNumber, labels);
}
