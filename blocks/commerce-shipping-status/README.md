# Commerce Shipping Status Block

## Overview

The Commerce Shipping Status block renders shipping status information using the @dropins/storefront-order ShippingStatus container. It provides shipping tracking, product images, and navigation with UPS-specific tracking integration.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Order Context**: When used in order-related pages, displays shipping status from order data
- **All Contexts**: Consistently renders shipping status regardless of page context

### User Interaction Flows

1. **Initialization**: Block initializes the order renderer and renders the ShippingStatus container
2. **Status Display**: Displays shipping status information with product images and tracking details
3. **Image Rendering**: Renders product images using AEM assets for various shipping status cards
4. **Tracking Navigation**: Users can click tracking links to view shipping status (UPS-specific handling)
5. **Product Navigation**: Users can navigate to product detail pages

### Error Handling

- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Container Errors**: If the ShippingStatus container fails to render, the block content remains empty
- **Data Errors**: If shipping status data is missing or invalid, the container handles appropriate fallback display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
