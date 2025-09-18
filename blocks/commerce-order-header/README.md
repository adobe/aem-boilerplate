# Commerce Order Header Block

## Overview

The Commerce Order Header block renders a dynamic header for order-related pages with conditional back navigation and order number display. It provides a standardized header that updates based on order data and page context.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`.-->

### URL Parameters

No URL parameters are directly read, but the block uses `window.location.href` to detect if the current page is an order details page (`CUSTOMER_ORDER_DETAILS_PATH`) to determine whether to show back navigation.

<!--### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('order/data', callback)` - Listens for order data updates to update header title with order number

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Order Details Page**: When on order details page (`CUSTOMER_ORDER_DETAILS_PATH`), shows back navigation link to orders list
- **Other Order Pages**: When on other order pages, shows standard order header without back navigation
- **Order Data Available**: When order data is available, updates header title to show order number

### User Interaction Flows

1. **Initialization**: Block renders header with default "Order" title
2. **Back Navigation**: If on order details page, adds back navigation link to orders list
3. **Order Data Update**: When order data is received, updates header title to show order number
4. **Navigation**: Users can click back link to return to orders list

### Error Handling

- **Placeholder Errors**: If placeholders fail to load, back navigation text may be missing
- **Order Data Errors**: If order data is invalid, header falls back to default "Order" title
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to default "Order" title if order data is unavailable
