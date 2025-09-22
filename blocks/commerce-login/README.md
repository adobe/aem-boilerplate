# Commerce Login Block

## Overview

The Commerce Login block provides user authentication functionality using the @dropins/storefront-auth SignIn container. It handles user sign-in with forgot password integration and redirects authenticated users to their account page.

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

- **Authenticated Users**: When user is already authenticated, redirects to customer account page
- **Unauthenticated Users**: When user is not authenticated, renders sign-in form
- **Forgot Password**: Provides integration with forgot password functionality

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Sign-In Process**: If not authenticated, renders sign-in form with forgot password link
4. **Success Redirect**: After successful sign-in, redirects to account page

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Sign-In Errors**: If sign-in fails, the SignIn container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to sign-in form if not authenticated
