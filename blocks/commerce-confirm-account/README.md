# Commerce Confirm Account Block

## Overview

The Commerce Confirm Account block handles account confirmation and sign-in functionality with email confirmation support. It provides a sign-in form for users to confirm their account and displays success notifications with account management options.

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
- **Unauthenticated Users**: When user is not authenticated, renders sign-in form with email confirmation
- **Success State**: After successful sign-in, shows success notification with account management options

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Sign-In Process**: If not authenticated, renders sign-in form with email confirmation enabled
4. **Success Handling**: After successful sign-in, shows welcome message with "My Account" and "Logout" buttons
5. **Account Management**: Users can navigate to account page or logout from success screen

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Sign-In Errors**: If sign-in fails, the SignIn container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to sign-in form if not authenticated
