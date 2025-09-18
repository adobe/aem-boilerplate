# Commerce Order Returns Block

## Overview

The Commerce Order Returns block renders return information for orders using the @dropins/storefront-order OrderReturns container. It provides return tracking, product images, and navigation with authentication-aware routing.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

- `orderRef` - Order reference identifier used for routing to return details pages
- `returnRef` - Return reference identifier used for routing to specific return details

<!--### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, uses customer return details path and order number for routing
- **Guest Users**: When user is not authenticated, uses guest return details path and token for routing
- **Return Tracking**: Provides tracking links with UPS-specific handling

### User Interaction Flows

1. **Initialization**: Block checks authentication status and sets appropriate routing paths
2. **Return Display**: Renders return information with product images and tracking details
3. **Image Rendering**: Displays return product images using AEM assets
4. **Tracking Navigation**: Users can click tracking links to view shipping status
5. **Return Details**: Users can navigate to return details pages with appropriate authentication routing

### Error Handling

- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Authentication Errors**: If authentication status is unclear, falls back to guest routing
- **URL Parameter Errors**: If order references are missing, uses fallback values
- **Container Errors**: If the OrderReturns container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to appropriate routing based on authentication status
