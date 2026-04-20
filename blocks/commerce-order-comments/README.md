# Commerce Order Comments Block

## Overview

The Commerce Order Comments block renders order comments using the @dropins/storefront-order OrderComments container. It provides a simple wrapper for displaying order comments (e.g. notes, messages) in order-related contexts such as customer account order details.

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

- **Order Context**: When used in order-related pages (e.g. customer account order details), displays order comments from order data
- **All Contexts**: Consistently renders the OrderComments container regardless of page context; the container shows empty state when no order or no comments are available

### User Interaction Flows

1. **Initialization**: Block initializes the order renderer and renders the OrderComments container
2. **Data Display**: Displays order comments (timestamp and message) based on available order data
3. **Read-Only View**: Provides read-only display of order comments; no editing or submission in this block

### Error Handling

- **Container Errors**: If the OrderComments container fails to render, the block content remains empty
- **Data Errors**: If order or comments data is missing or invalid, the container handles appropriate fallback display (e.g. empty state)
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
