# Commerce Customer Details Block

## Overview

The Commerce Customer Details block renders customer information display using the @dropins/storefront-order CustomerDetails container. It provides a simple wrapper for displaying customer details in order-related contexts.

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

- **Order Context**: When used in order-related pages, displays customer details from order data
- **All Contexts**: Consistently renders customer details regardless of page context

### User Interaction Flows

1. **Initialization**: Block initializes the order renderer and renders the CustomerDetails container
2. **Data Display**: Displays customer information based on available order data
3. **Read-Only View**: Provides read-only display of customer details

### Error Handling

- **Container Errors**: If the CustomerDetails container fails to render, the block content remains empty
- **Data Errors**: If customer data is missing or invalid, the container handles appropriate fallback display
- **Configuration Errors**: No configuration errors possible as block uses default configuration
- **Fallback Behavior**: Always falls back to empty display if container rendering fails
