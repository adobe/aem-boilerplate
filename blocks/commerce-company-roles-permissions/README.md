# Commerce Company Roles & Permissions Block

## Overview

The Commerce Company Roles & Permissions block displays company role management interface for B2B customers. It integrates with the Adobe Commerce Company Management dropin to show company roles, manage permissions, and provide administrative controls for role-based access control.

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
- **Authenticated Company Users**: Block shows access denied for non-admin users
- **Company Admins**: Block provides full role and permission management interface
- **Company Members**: Block shows access denied message
- **Registration Disabled**: Block redirects to login when backend doesn't allow company registration

### User Interaction Flows

1. **Role Management Display Flow**:
   - Check user authentication status
   - Validate `allowCompanyRegistration` backend permission
   - Check if user belongs to a company via `isCompanyUser`
   - Verify company admin permissions
   - Display appropriate interface based on user status

2. **Empty State Flow** (Non-company users):
   - Show company registration empty state
   - Provide link to company registration form
   - Explain benefits of company membership

3. **Administrative Flow** (Company admins):
   - Display roles and permissions table
   - Show role creation and editing interface
   - Provide permission assignment controls
   - Enable role deletion and duplication

4. **Access Denied Flow** (Non-admin company users):
   - Show access denied message
   - Explain admin-only access requirements
   - Provide contact information for admin access

### Error Handling

- **Authentication Required**: Redirects to login page for unauthenticated users
- **Permission Denied**: Shows access denied message for non-admin users
- **API Errors**: Graceful fallback with error messaging and retry options
- **Network Errors**: Display retry option with error messaging
- **Role Creation Errors**: Show validation errors with corrective guidance

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce.js` - Authentication and routing utilities

### CSS Classes

- `.commerce-company-roles-permissions-container` - Main container class applied to block
- Additional classes are provided by the dropin component

### Authentication Integration

- Uses `checkIsAuthenticated()` to determine user state
- Provides redirect callbacks for login and account navigation
- Integrates with company admin role checking
- Validates role-based permissions for interface access

### Component States

- **Loading State**: Shows while checking user authentication and company admin status
- **Empty State**: Displayed for non-company users with registration CTA
- **Access Denied State**: Shows for company users without admin privileges
- **Roles Management State**: Shows full role management interface for company admins
- **Redirect States**: Handles navigation to login or account pages as needed

### Role Management Features

- **Role Listing**: Displays paginated table of company roles
- **Role Creation**: Interface for creating new roles with permission assignment
- **Role Editing**: Modify existing role names and permissions
- **Role Deletion**: Remove roles with confirmation dialogs
- **Role Duplication**: Copy existing roles as templates
- **Permission Management**: Assign and revoke specific permissions
- **User Assignment**: View users assigned to each role
