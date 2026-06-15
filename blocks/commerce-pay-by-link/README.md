# commerce-pay-by-link

Renders the Pay By Link payment page. Resolves a token from the URL, fetches the order summary via GraphQL, and displays items, totals, and addresses. Exposes a `Payment` slot for mounting a gateway SDK.

## URL parameters

| Parameter | Required | Description |
|---|---|---|
| `token` | Yes | 64-char lowercase hex token from the payment link email |

Missing or malformed tokens render an error state immediately without making a network request.

## Slots

Import the `slots` object to mount a payment gateway SDK into the payment container. Override must happen before the block's `decorate` function runs (i.e., during the eager phase).

```js
import { slots } from '/blocks/commerce-pay-by-link/commerce-pay-by-link.js';

slots.Payment = async (ctx) => {
  const container = document.createElement('div');
  await mountGatewaySDK(container, {
    token: ctx.token,
    amount: ctx.order.totals.grand_total,
  });
  ctx.replaceWith(container);
};
```

### Slot context (`ctx`)

| Property | Type | Description |
|---|---|---|
| `ctx.order` | Object | Full `payByLinkOrder` GraphQL response |
| `ctx.token` | String | Raw token string from the URL |
| `ctx.replaceWith(el)` | Function | Replace the slot container's content |
| `ctx.appendChild(el)` | Function | Append to the slot container |
| `ctx.prependChild(el)` | Function | Prepend to the slot container |

## Error states

| Condition | Error kind | Notes |
|---|---|---|
| No `token` param | `missing` | Shown before any network call |
| Token fails regex | `malformed` | Shown before any network call |
| `TOKEN_NOT_FOUND` from API | `not-found` | |
| `TOKEN_EXPIRED` from API | `expired` | |
| `ORDER_ALREADY_PAID` from API | `already-paid` | |
| `ORDER_CANCELLED` from API | `cancelled` | |

All error states render a focusable alert card with a support CTA.

## Loading skeleton

While the GraphQL query is in flight, slots `.pay-by-link__order-header`, `.pay-by-link__order-summary`, `.pay-by-link__addresses`, and `.pay-by-link__order-totals` carry the `pay-by-link__skeleton` class and `aria-busy="true"`. Both are removed once the response resolves.

## i18n

Labels are loaded via `fetchPlaceholders()` from the AEM CMS spreadsheet under the `PayByLink` namespace. See [scripts/commerce.js](../../scripts/commerce.js) for the placeholder loading pattern. Required keys: `ErrorMissingTokenTitle`, `ErrorMissingTokenBody`, `ErrorMalformedTokenTitle`, `ErrorMalformedTokenBody`, `ErrorNotFoundTitle`, `ErrorNotFoundBody`, `ErrorExpiredTitle`, `ErrorExpiredBody`, `ErrorAlreadyPaidTitle`, `ErrorAlreadyPaidBody`, `ErrorCancelledTitle`, `ErrorCancelledBody`, `ErrorContactSupportLabel`, `CustomerEmailLabel`, `OrderItemsHeading`, `QtyLabel`, `OrderTotalsHeading`, `SubtotalLabel`, `TaxLabel`, `ShippingLabel`, `GrandTotalLabel`, `ShippingAddressHeading`, `BillingAddressHeading`.

## Page shell

This block expects `body.pay-by-link-page` to be set by the AEM page template. That class drives the simplified header (logo only, no nav) defined in `blocks/header/header.css`.
