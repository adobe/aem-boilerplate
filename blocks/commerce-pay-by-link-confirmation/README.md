# Commerce Pay By Link Confirmation

Standalone EDS page block that hosts the Pay By Link post-payment confirmation surface. Drop the block onto an authored page at `/pay/confirmation`. The block reads `?order=<order_number>` from the URL, optionally consumes a full order object from `window.history.state.orderData`, and renders either the complete order summary (via the `storefront-order` dropin) or a thank-you "thank you" view when state is not available.

## Authored content

The block takes no authored content. Drop it onto the `/pay/confirmation` page with no children; everything visible is rendered by the block.

## Required page metadata

The authored `/pay/confirmation` document needs the following metadata:

| Metadata | Value | Effect |
| --- | --- | --- |
| `robots` | `noindex,nofollow` | Confirmation URLs are per-order and should not be indexed. |
| `placeholders` | path to the shared PBL placeholders sheet | The block calls `fetchPlaceholders()` with no path, so this metadata is the single source of truth. |

## URL contract

- `/pay/confirmation?order=<order_number>` → renders the confirmation page.
- `/pay/confirmation` (no `order`) → renders the "missing order" error state.
- `/pay/confirmation?order=<anything failing the format check>` → renders the "malformed order" error state.

Accepted `order_number` format: `^[A-Za-z0-9_-]{4,32}$`.

## Authentication

This page does **not** auth-check the visitor. The PBL flow is token-only and by the time the customer reaches this page the token has been consumed at payment time. Do not add `checkIsAuthenticated` guards here.

## history.state handoff

To render the full order summary without a refetch, the upstream payment-success callback must push the order into `history.state` before navigating:

```js
window.history.pushState(
  { orderData },
  '',
  `/pay/confirmation?order=${encodeURIComponent(orderData.number)}`,
);
```

`orderData` must be the shape `payByLinkOrder` returns — the `storefront-order` dropin's `orderApi.initialize({ orderData })` consumes it directly.

When `history.state.orderData` is absent (refresh, direct nav, email link), the block falls through to a thank-you thank-you view rendered from the URL's `order_number` alone. The customer's confirmation email is the durable record.

## Events

### Event Emitters

- `events.emit('pay-by-link/confirmation', { orderNumber })` — fires once per page load whenever `?order` is a structurally valid order number, before the block decides between the full-summary and thank-you views. Subscribers (e.g. analytics, ACCS-878) should treat this as a "confirmation page rendered for order X" signal. Not emitted when `?order` is missing or malformed.

Payload:

| Field | Type | Description |
| --- | --- | --- |
| `orderNumber` | `string` | The validated order number from the URL (matches `^[A-Za-z0-9_-]{4,32}$`). |

The event is emitted synchronously during the block's `decorate` and only fires once per page load — subscribers must be registered before the block decorates (e.g. in an EDS initializer or in `scripts.js`). Late subscribers will miss the emit on the current page.

Example subscriber:

```js
import { events } from '@dropins/tools/event-bus.js';

events.on('pay-by-link/confirmation', ({ orderNumber }) => {
  // forward to your analytics layer, e.g. window.adobeDataLayer.push(...)
});
```

### Event Listeners

This block does not subscribe to any events.

## Placeholders

The block reads i18n strings via `fetchPlaceholders()` (no path argument), which resolves the sheet declared in the page's `<meta name="placeholders">` metadata. All keys are under the `PayByLinkConfirmation.*` namespace.

| Key | Used for |
| --- | --- |
| `PayByLinkConfirmation.ThankYouTitle` | Heading on the thank-you view |
| `PayByLinkConfirmation.ThankYouBody` | Body copy on the thank-you view |
| `PayByLinkConfirmation.OrderNumberLabel` | Label preceding the order number |
| `PayByLinkConfirmation.ContinueShoppingLabel` | CTA label on the thank-you view |
| `PayByLinkConfirmation.ErrorMissingOrderTitle` | Heading when `?order` is missing |
| `PayByLinkConfirmation.ErrorMissingOrderBody` | Body when `?order` is missing |
| `PayByLinkConfirmation.ErrorMalformedOrderTitle` | Heading when `?order` fails format validation |
| `PayByLinkConfirmation.ErrorMalformedOrderBody` | Body when `?order` fails format validation |
| `PayByLinkConfirmation.ErrorContinueShoppingLabel` | CTA label on the error card |

Strings consumed by the dropin containers (OrderHeader, OrderStatus, CustomerDetails, OrderCostSummary, OrderProductList) are passed through `langDefinitions` and follow the dropin's own placeholder keys.
