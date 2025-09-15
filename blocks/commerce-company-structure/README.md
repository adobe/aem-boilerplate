# Commerce Company Structure Block

## Overview

The Commerce Company Structure block displays company organizational structure and management interface for B2B customers. It integrates with the Adobe Commerce Company Management dropin to show company hierarchy, manage company users, and provide administrative controls for company structure.

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

- **Unauthenticated Users**: Block redirects to login page
- **Authenticated Non-Company Users**: Block shows empty state with company registration option
- **Authenticated Company Users**: Block displays company structure interface
- **Company Admins**: Block provides full administrative controls
- **Company Members**: Block shows read-only structure view
- **Registration Disabled**: Block redirects to login when backend doesn't allow company registration

### User Interaction Flows

1. **Company Structure Display Flow**:
   - Check user authentication status
   - Validate `allowCompanyRegistration` backend permission
   - Check if user belongs to a company via `isCompanyUser`
   - Display appropriate interface based on user status

2. **Empty State Flow** (Non-company users):
   - Show company registration empty state
   - Provide link to company registration form
   - Explain benefits of company membership

3. **Administrative Flow** (Company users):
   - Display company organizational chart
   - Show user management interface
   - Provide role and permission controls

### Error Handling

- **Authentication Required**: Redirects to login page for unauthenticated users
- **API Errors**: Graceful fallback to empty state with registration option
- **Permission Errors**: Show appropriate message based on user role
- **Network Errors**: Display retry option with error messaging

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce.js` - Authentication and routing utilities

### CSS Classes

- `.commerce-company-structure-container` - Main container class applied to block
- Additional classes are provided by the dropin component

### Authentication Integration

- Uses `checkIsAuthenticated()` to determine user state
- Provides redirect callbacks for login and account navigation
- Integrates with company user role checking

### Component States

- **Loading State**: Shows while checking user authentication and company status
- **Empty State**: Displayed for non-company users with registration CTA
- **Structure State**: Shows company organizational structure for company members
- **Redirect States**: Handles navigation to login or account pages as needed
