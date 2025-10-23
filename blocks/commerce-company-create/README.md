# Commerce Company Create Block

## Overview

The Commerce Company Create block provides a company registration form for B2B customers. It integrates with the Adobe Commerce Company Management dropin to handle company registration workflows, including frontend configuration checks, authentication validation, and form submission.

<!-- ## Integration -->

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events -->

<!-- #### Event Listeners

No direct event listeners are implemented in this block. -->

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Unauthenticated Users**: Shows registration form for new company creation
- **Authenticated Non-Company Users**: Shows registration form to create a company
- **Authenticated Company Users**: Redirects to account page (user already has company)
- **B2B Disabled**: Redirects to login/account based on authentication status

### User Interaction Flows

1. **Registration Flow**:
   - Check frontend and backend configuration
   - Validate user authentication and company membership
   - Show form for eligible users or redirect as needed
   - Handle form submission and success state

2. **Redirect Logic**:
   - Configuration disabled → Redirect based on authentication status
   - User already has company → Redirect to account page
   - API errors → Redirect based on authentication status

### Error Handling

- **Configuration Issues**: Redirects based on authentication status
- **API Errors**: Graceful fallback with appropriate redirects
- **Form Validation**: Inline error messages with retry options

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `@dropins/tools/lib/aem/configs.js` - Frontend configuration utilities
- `commerce.js` - Authentication and routing utilities

### CSS Classes

- `.commerce-company-create-container` - Main container class applied to block
- `.company-registration-container` - Dropin container class
- `.company-form` - Form wrapper class

### Authentication Integration

- Uses `checkIsAuthenticated()` to determine user state
- Provides redirect callbacks for login and account navigation
- Integrates with `authPrivacyPolicyConsentSlot` for privacy policy compliance
