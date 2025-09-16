# Commerce Create Account Block

## Overview

The Commerce Create Account block provides user registration functionality with sign-up form, email confirmation, and privacy policy consent. It handles new user account creation with authentication flow integration and redirects authenticated users to their account page.

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
- **Unauthenticated Users**: When user is not authenticated, renders sign-up form
- **Email Confirmation**: Handles email confirmation flow with appropriate UI states

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Registration Process**: If not authenticated, renders sign-up form with privacy policy consent
4. **Email Confirmation**: After registration, handles email confirmation flow
5. **Success Redirect**: After successful sign-up and confirmation, redirects to account page

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Registration Errors**: If sign-up fails, the SignUp container handles error display
- **Email Confirmation Errors**: If email confirmation fails, appropriate error handling is provided
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to sign-up form if not authenticated
