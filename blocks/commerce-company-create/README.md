# Commerce Company Create Block

## Overview

The Commerce Company Create block provides a company registration form for B2B customers. It integrates with the Adobe Commerce Company Management dropin to handle company registration workflows, including frontend configuration checks, authentication validation, and form submission.

## Integration

### Block Configuration

This block does not use `readBlockConfig()` - all configuration is handled through global commerce configuration and dropin initialization.

### URL Parameters

- No URL query parameters are used by this block

### Local Storage

- No localStorage keys are directly used by this block (authentication state is managed by commerce framework)

### Events

#### Event Listeners

- `events.on('b2b/config', callback)` - Listens for B2B configuration status updates from commerce-b2b.js
- Authentication state changes are handled through the commerce framework

#### Event Emitters

- `events.emit('company/registration-started', data)` - Emitted when company registration process begins
- `events.emit('company/registration-success', company)` - Emitted when company registration succeeds
- `events.emit('company/registration-failed', errors)` - Emitted when registration fails with validation errors

## Behavior Patterns

### Page Context Detection

- **Unauthenticated Users**: Block displays registration form for new company creation
- **Authenticated Non-Company Users**: Block displays registration form to join/create a company
- **Authenticated Company Users**: Block redirects to account page (user already has company)
- **Frontend B2B Disabled**: Block redirects to login page when `commerce-companies-enabled: false` in config

### User Interaction Flows

1. **Company Registration Flow**:
   - Frontend checks `commerce-companies-enabled` configuration
   - Dropin validates backend `allowCompanyRegistration` API
   - Dropin checks if authenticated user already belongs to company
   - Form is displayed for eligible users
   - Form submission creates company and shows success message

2. **Redirect Flows**:
   - Frontend config disabled → Redirect to login
   - Backend registration disabled → Redirect based on authentication
   - User already in company → Redirect to account page

### Error Handling

- **Frontend Configuration Disabled**: Redirects to appropriate page (login/account) based on authentication
- **Backend API Errors**: Handled gracefully by dropin with fallback to login redirect
- **Form Validation Errors**: Displayed inline with form fields
- **Network Errors**: Show user-friendly error messages and allow retry

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce-b2b.js` - Frontend B2B configuration utilities
- `commerce.js` - Authentication and routing utilities

### CSS Classes

- `.commerce-company-create-container` - Main container class applied to block
- `.company-registration-container` - Dropin container class
- `.company-form` - Form wrapper class

### Authentication Integration

- Uses `checkIsAuthenticated()` to determine user state
- Provides redirect callbacks for login and account navigation
- Integrates with `authPrivacyPolicyConsentSlot` for privacy policy compliance
