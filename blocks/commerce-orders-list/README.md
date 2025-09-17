# Commerce Orders List Block

## Overview

The Commerce Orders List block renders a list of customer orders using the @dropins/storefront-account OrdersList container. It provides order management with product images, tracking links, and navigation with authentication protection and configurable view modes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `minified-view` | string | `'false'` | Controls whether orders are displayed in minified or full view mode | No | Changes the visual layout and available actions |

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

- **Authenticated Users**: When user is authenticated, renders the full orders list interface
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **Minified View**: When `minified-view` is 'true', displays orders in a compact format
- **Full View**: When `minified-view` is 'false', displays orders in full format with all details

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Orders Display**: If authenticated, renders orders list with product images and tracking
4. **Navigation**: Users can navigate to order details, return details, and product pages
5. **Tracking**: Users can click tracking links to view shipping status

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Configuration Errors**: If `readBlockConfig()` fails, uses default minified view setting
- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Container Errors**: If the OrdersList container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to full view mode if configuration is invalid
