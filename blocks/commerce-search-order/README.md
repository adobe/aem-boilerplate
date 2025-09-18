# Commerce Search Order Block

## Overview

The Commerce Search Order block provides order search functionality using the @dropins/storefront-order OrderSearch container. It handles both authenticated and guest order searches with dynamic sign-in form rendering and authentication-aware routing.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses hardcoded configuration values and authentication status. -->

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('order/data', callback)` - Listens for order data updates to re-render the search interface

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, provides direct order search functionality
- **Unauthenticated Users**: When user is not authenticated, shows sign-in form for order access
- **Order Data Available**: When order data is available, re-renders the search interface

### User Interaction Flows

1. **Initialization**: Block renders order search interface based on authentication status
2. **Guest Search**: Unauthenticated users can search for orders by email and order number
3. **Sign-In Flow**: When guest search requires authentication, shows sign-in form
4. **Authenticated Search**: Authenticated users can search for their orders directly
5. **Order Navigation**: After successful search, users can navigate to order details

### Error Handling

- **Authentication Errors**: If authentication status is unclear, falls back to guest search mode
- **Search Errors**: If order search fails, the OrderSearch container handles error display
- **Sign-In Errors**: If sign-in fails, the SignIn container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to appropriate search mode based on authentication status
