# Commerce Forgot Password Block

## Overview

The Commerce Forgot Password block provides password reset functionality using the @dropins/storefront-auth ResetPassword container. It handles password reset requests and redirects authenticated users to their account page.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('authenticated', callback)` - Listens for authentication state changes and redirects to account page if user becomes authenticated

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is already authenticated, redirects to customer account page
- **Unauthenticated Users**: When user is not authenticated, renders password reset form
- **Authentication Changes**: Monitors authentication state changes and redirects accordingly

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If already authenticated, redirects to account page
3. **Password Reset**: If not authenticated, renders password reset form
4. **Reset Process**: Users can enter email to request password reset
5. **Authentication Monitoring**: Continuously monitors authentication state and redirects if user becomes authenticated

### Error Handling

- **Authentication Errors**: If user is already authenticated, automatically redirects to account page
- **Reset Errors**: If password reset fails, the ResetPassword container handles error display
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to password reset form if not authenticated
