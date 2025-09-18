# Commerce Checkout Block

## Overview

The Commerce Checkout block provides a comprehensive **one-page checkout** experience with dynamic form handling, payment processing, address management, and order placement. It integrates multiple dropin containers for authentication, cart management, payment services, and order processing with dynamic UI state management and validation.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

No URL parameters are directly read, but the block uses `window.location.href` for meta tag management and page title updates.

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('authenticated', callback)` - Handles user authentication state changes
- `events.on('cart/initialized', callback)` - Handles cart initialization with eager loading
- `events.on('checkout/initialized', callback)` - Handles checkout initialization with eager loading
- `events.on('checkout/updated', callback)` - Handles checkout data updates
- `events.on('checkout/values', callback)` - Handles checkout form value changes
- `events.on('order/placed', callback)` - Handles successful order placement

#### Event Emitters

- `events.emit('checkout/addresses/shipping', values)` - Emits shipping address form values with debouncing
- `events.emit('checkout/addresses/billing', values)` - Emits billing address form values with debouncing

## Behavior Patterns

### Page Context Detection

- **Checkout Flow**: Renders full checkout interface with shipping, billing, payment, and order summary
- **Empty Cart**: When cart is empty, shows empty cart message and hides checkout forms
- **Server Errors**: When server errors occur, shows error state and hides checkout forms
- **Out of Stock**: When items are out of stock, shows out of stock message with cart update options
- **Order Confirmation**: After successful order placement, transitions to order confirmation view

### User Interaction Flows

1. **Initialization**: Block sets up meta tags, renders checkout layout, and initializes all containers
2. **Authentication**: Users can sign in/out via modal with form validation and success callbacks
3. **Address Management**: Users can enter shipping/billing addresses with real-time validation and cart updates
4. **Payment Processing**: Users can select payment methods and enter credit card information with validation
5. **Order Placement**: Users can place orders with comprehensive form validation and payment processing
6. **Error Handling**: Block shows appropriate error states and recovery options for various failure scenarios

### Error Handling

- **Form Validation Errors**: Individual form validation with scroll-to-error functionality
- **Payment Processing Errors**: Credit card validation and payment service error handling
- **Server Errors**: Server error display with retry functionality
- **Cart Errors**: Empty cart and out-of-stock item handling
- **Network Errors**: Graceful handling of network failures with user feedback
- **Fallback Behavior**: Always falls back to appropriate error states with recovery options