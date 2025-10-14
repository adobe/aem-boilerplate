# Commerce Cart Block

## Overview

The Commerce Cart block renders a comprehensive shopping cart interface with product management, order summary, gift options, and wishlist integration. It provides a full-featured cart experience with configurable options for item management, shipping estimation, and checkout flow.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `hide-heading` | string | `'false'` | Controls whether the cart heading is hidden | No | Changes visibility of cart section heading |
| `max-items` | string | undefined | Maximum number of items to display in cart | No | Limits the number of cart items shown |
| `hide-attributes` | string | `''` | Comma-separated list of product attributes to hide | No | Hides specified product attributes from display |
| `enable-item-quantity-update` | string | `'false'` | Enables quantity update controls for cart items | No | Shows/hides quantity adjustment controls |
| `enable-item-remove` | string | `'true'` | Enables remove item functionality | No | Shows/hides remove item buttons |
| `enable-estimate-shipping` | string | `'false'` | Enables shipping estimation functionality | No | Shows/hides shipping estimation section |
| `start-shopping-url` | string | `''` | URL for "Start Shopping" button when cart is empty | No | Sets destination for empty cart CTA |
| `checkout-url` | string | `''` | URL for checkout button | No | Sets destination for checkout action |
| `enable-updating-product` | string | `'false'` | Enables product editing via mini-PDP modal | No | Shows/hides edit buttons for configurable products |
| `undo-remove-item` | string | `'false'` | Enables undo functionality when removing items | No | Shows/hides undo option after item removal |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('cart/data', callback)` - Listens for cart data updates to refresh the cart display and toggle empty state
- `events.on('wishlist/alert', callback)` - Listens for wishlist actions to show wishlist-related notifications

#### Event Emitters

- `publishShoppingCartViewEvent()` - Emits shopping cart view event for analytics tracking

## Behavior Patterns

### Page Context Detection

- **Empty Cart**: When cart has no items, shows empty cart message with start shopping CTA
- **Populated Cart**: When cart has items, shows full cart interface with product list and order summary
- **Configurable Products**: When configurable products are present and editing is enabled, shows edit buttons
- **Gift Options**: Shows gift options section when cart is not empty

### User Interaction Flows

1. **Cart Display**: Block renders cart items, order summary, and gift options based on current cart state
2. **Item Management**: Users can update quantities, remove items, and edit configurable products
3. **Product Editing**: Clicking edit button opens mini-PDP modal for configurable product updates
4. **Wishlist Integration**: Users can move items to/from wishlist with confirmation notifications
5. **Checkout Flow**: Users can proceed to checkout via configured checkout URL
6. **Empty Cart Handling**: When cart is empty, shows start shopping CTA and hides order summary

### Error Handling

- **Mini-PDP Errors**: If mini-PDP modal fails to open, shows error notification with dismiss option
- **Cart Data Errors**: If cart data is invalid or missing, treats cart as empty
- **Configuration Errors**: If `readBlockConfig()` fails, uses default configuration values
- **Render Errors**: If container rendering fails, the affected section remains empty
- **Fallback Behavior**: Always falls back to default configuration values for missing or invalid settings
