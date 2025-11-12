# Commerce B2B Purchase Order Checkout Success Block

## Overview

The Commerce B2B PO Checkout Success block renders the post-purchase order confirmation experience for B2B purchase orders using the @dropins/storefront-purchase-order PurchaseOrderConfirmation container. It provides purchase order confirmation display with automatic scroll positioning, purchase order details navigation, and a continue shopping action.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. The Purchase Order drop-in may use URL parameters to identify the purchase order. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No events are listened to by this block.

#### Event Emitters

No events are emitted by this block. -->

## Public API

### Exports

- `default export decorate(block)` — Block decorator that renders the purchase order success view into the provided block element.
- `export async function renderPOSuccess(container, { poData } = {})` — Renders the success view into the specified container. Pass `poData` with a `number` property to provide the purchase order number for confirmation display and details navigation.

### Usage Examples

**Programmatic usage:**

```js
import { renderPOSuccess } from "./blocks/commerce-b2b-po-checkout-success/commerce-b2b-po-checkout-success.js";

// Render with purchase order data
await renderPOSuccess(container, { poData: { number: "PO-12345" } });
```

**Block usage:**

```html
<div class="block commerce-b2b-po-checkout-success"></div>
```

## Behavior Patterns

### Page Context Detection

- **Purchase Order Confirmation**: Displays confirmation for the newly created purchase order
- **Scroll Positioning**: Automatically scrolls to top of page on load for proper confirmation visibility
- **CSS Loading**: Dynamically loads block-specific styles (`commerce-b2b-po-checkout-success.css`)

### User Interaction Flows

1. **Page Load**: Block initializes and scrolls window to top position
2. **Fragment Creation**: Creates DOM structure using centralized fragment utilities
3. **Content Rendering**: Renders PurchaseOrderConfirmation container with purchase order number
4. **Navigation Setup**: Configures purchase order details route callback using `routePurchaseOrderDetails`
5. **Footer Display**: Renders continue shopping button with navigation to homepage
6. **Parallel Rendering**: Content and footer render concurrently using Promise.all for optimal performance

### Error Handling

- **Missing PO Data**: If no `poData` is provided to `renderPOSuccess`, the Purchase Order drop-in will attempt to fetch data when possible
- **Container Errors**: PurchaseOrderConfirmation container handles its own data fetching states and error UI
- **Rendering Errors**: If container rendering fails, error states are managed by the drop-in's internal error handling
- **Fallback Behavior**: Block relies on drop-in's built-in error recovery and user feedback mechanisms

## DOM Structure

This block builds a scoped fragment using centralized selectors that follows this structure:

```html
<div class="po-confirmation">
  <div class="po-confirmation__content">
    <!-- PurchaseOrderConfirmation container renders here -->
  </div>
  <div class="po-confirmation__footer">
    <button class="po-confirmation-footer__continue-button">
      Continue shopping
    </button>
  </div>
</div>
```

### Rendered Containers

- **PurchaseOrderConfirmation** — Displays purchase order confirmation details from `@dropins/storefront-purchase-order`
  - Receives `purchaseOrderNumber` to identify the order
  - Receives `routePurchaseOrderDetails` callback for navigation to `/customer/purchase-order-details?poRef={poNumber}`
- **Continue Shopping Button** — UI Button component with medium size, primary variant, navigates to homepage via `rootLink('/')`

## Styling

- **CSS File**: `commerce-b2b-po-checkout-success.css`
- **Class Naming**: Follows BEM-style `po-confirmation__*` pattern for scoping
- **Layout Spacing**: Uses CSS custom property `--spacing-large` for vertical padding on main container
- **Footer Constraint**: Footer width constrained to `max-content` for optimal button sizing

### CSS Custom Properties

- `--spacing-large` — Applied to top and bottom padding of `.po-confirmation`

## Dependencies

### Drop-in Packages

- `@dropins/storefront-purchase-order` — PurchaseOrderConfirmation container and render provider
- `@dropins/storefront-checkout` — Fragment creation and scoped selector utilities
- `@dropins/tools` — UI Button component and provider

### Local Modules

- `scripts/commerce.js` — rootLink helper for navigation
- `scripts/aem.js` — loadCSS utility for dynamic stylesheet loading
- `scripts/initializers/purchase-order.js` — Purchase Order drop-in initializer

## Implementation Details

### Selectors

Centralized selectors object using frozen constants:

```js
const selectors = Object.freeze({
  poConfirmation: {
    content: ".po-confirmation__content",
    footer: ".po-confirmation__footer",
    continueButton: ".po-confirmation-footer__continue-button",
  },
});
```

### Fragment Creation

Uses `createFragment` utility to build DOM structure declaratively, then applies `createScopedSelector` for type-safe element selection.

### Rendering Strategy

- **Parallel Rendering**: Content and footer render concurrently for performance
- **Container Replacement**: Uses `replaceChildren` to cleanly replace block content with confirmation fragment
- **Async Loading**: CSS and container rendering happen asynchronously

## Notes

- This block is specifically designed for B2B purchase order workflows and complements the standard `commerce-checkout-success` block for regular orders
- The block is read-only and focused on confirmation and post-purchase actions
- Navigation to purchase order details is handled via the `routePurchaseOrderDetails` callback which uses the `poRef` query parameter
- No authentication or permission checks are performed as this is a post-checkout confirmation page
- The block follows the same architectural patterns as the multistep checkout flow for consistency
