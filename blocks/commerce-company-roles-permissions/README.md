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

### Events

#### Event Listeners

- **`companyContext/changed`**: Listens for company switcher events via `useCompanyContextListener` to refresh data and manage form states when users switch between companies.

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Unauthenticated Users**: Block redirects to login page
- **Authenticated Users**: Block checks user permissions for role management
- **Users with Role View Permission**: Block shows read-only role interface
- **Users with Role Management Permission**: Block provides full role and permission management interface
- **Users without Role Access**: Block shows access denied message with illustrated message explaining permission requirements

### User Interaction Flows

1. **Permission Check Flow**:
   - Check user authentication status
   - Validate role-based permissions via `useUserPermissions`
   - Display appropriate interface based on permission level

2. **Role Management Display Flow** (Users with permissions):
   - Load company roles and ACL resources via `useCompanyRoles`
   - Display paginated roles table with management controls
   - Show role creation, editing, duplication, and deletion interfaces

3. **Access Denied Flow** (Users without permissions):
   - Show access denied message
   - Explain permission requirements
   - Provide contact information for admin access

4. **Company Context Change Flow**:
   - Listen for company switcher events via `useCompanyContextListener`
   - Reset pagination to page 1
   - Close edit forms and delete modals
   - Keep create/duplicate forms open with preserved data
   - Refresh roles and ACL resources for new company

### Error Handling

- **Authentication Required**: Redirects to login page for unauthenticated users
- **Permission Denied**: Shows access denied message for users without role permissions
- **API Errors**: Graceful fallback with error messaging and retry options
- **Network Errors**: Display retry option with error messaging
- **Role Operation Errors**: Show validation errors with corrective guidance

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce.js` - Authentication and routing utilities
- `@adobe-commerce/event-bus` - Company context change events

### CSS Classes

- `.commerce-company-roles-permissions-container` - Main container class applied to block
- Additional classes are provided by the dropin component

### Authentication Integration

- Uses `checkIsAuthenticated()` to determine user state
- Provides redirect callbacks for login and account navigation
- Integrates with role-based permission checking via `useUserPermissions`
- Validates specific permissions (`canViewRoles`, `canManageRoles`) for interface access

### Component States

- **Loading State**: Shows while checking user permissions and loading roles
- **Access Denied State**: Shows for users without role permissions
- **Roles Management State**: Shows full role management interface for authorized users
- **Form States**: Handles create, edit, and delete modal states
- **Redirect States**: Handles navigation to login or account pages as needed

### Role Management Features

- **Role Listing**: Displays paginated table of company roles with client-side pagination
- **Role Creation**: Interface for creating new roles with permission assignment
- **Role Editing**: Modify existing role names and permissions
- **Role Deletion**: Remove roles with confirmation dialogs (blocks deletion if role has users)
- **Role Duplication**: Copy existing roles as templates with pre-filled data
- **Permission Management**: Assign and revoke specific permissions via ACL resource tree
- **User Assignment**: View user count for each role
- **Company Switching**: Automatic data refresh and form state management when switching companies

### Company Context Integration

- **Event Listening**: Subscribes to `companyContext/changed` events
- **Smart Form Behavior**: 
  - Keeps create/duplicate forms open with preserved data
  - Closes edit forms (role doesn't exist in new company)
  - Closes delete modals for safety
- **Data Refresh**: Automatically reloads roles and ACL resources for new company
- **Pagination Reset**: Resets to page 1 when switching companies
