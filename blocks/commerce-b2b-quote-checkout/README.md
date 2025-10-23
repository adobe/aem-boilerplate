# Commerce B2B Quote Checkout

## Overview

The Commerce B2B Quote Checkout block provides a comprehensive **one-page checkout** experience for **negotiable quotes** with dynamic form handling, payment processing, billing address management, and order placement. It integrates multiple dropin containers with dynamic UI state management and validation.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

 - `quoteId` (required): The quote UID to check out (e.g., `?quoteId=<uid>`).

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('authenticated', callback)` - Handles user authentication state changes
- `events.on('checkout/initialized', callback)` - Handles checkout initialization with eager loading
- `events.on('checkout/updated', callback)` - Handles checkout data updates
- `events.on('checkout/values', callback)` - Handles checkout form value changes
- `events.on('checkout/error', callback)` - Handles checkout error scenarios
- `events.on('order/placed', callback)` - Handles successful order placement

#### Event Emitters

- `events.emit('checkout/addresses/billing', values)` - Emits billing address form values with debouncing

## Behavior Patterns

### Page Context Detection

- **Unauthenticated Users**: When user is not authenticated, they will be redirected to the _/customer/login_ URL.
- **Authenticated Users**: When user is authenticated, renders full checkout interface with shipping, billing, payment, and order summary
- **No Permissions to Checkout Quote**: Displays an error when the user lacks permissions to proceed with checkout

### User Interaction Flows

1. **Initialization**: Block sets up meta tags, renders checkout layout, and initializes all containers
2. **Address Management**: Users can enter billing addresses with real-time validation, while the shipping address is displayed based on the one set in the quote and cannot be edited.
3. **Payment Processing**: Users can select payment methods and enter information with validation
4. **Order Placement**: Users can place orders with comprehensive form validation and payment processing
5. **Error Handling**: Block shows appropriate error states and recovery options for various failure scenarios

### Error Handling

- **Unable to Fetch Quote**: Displays an error when the quote cannot be retrieved
- **Form Validation Errors**: Individual form validation with scroll-to-error functionality
- **Payment Processing Errors**: Payment service error handling
- **Server Errors**: Server error display with retry functionality
- **Network Errors**: Graceful handling of network failures with user feedback
- **Fallback Behavior**: Always falls back to appropriate error states with recovery options