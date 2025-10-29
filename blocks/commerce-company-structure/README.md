# Commerce Company Structure Block

## Overview

The Commerce Company Structure block displays company organizational structure and management interface for B2B customers using the `@dropins/storefront-company-management` CompanyStructure container. The block passes authentication state and redirect callbacks to the container, which handles showing either the company structure (for company users) or a registration link (for non-company users).

## Integration

### Block Configuration

No block configuration is read via `readBlockConfig()`. The block functionality is controlled entirely by the dropin container.

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

### Authentication and Authorization Flow

The block delegates authentication and authorization logic to the CompanyStructure container:

- **Block Responsibility**: 
  - Checks user authentication status using `checkIsAuthenticated()`
  - Passes authentication state to the container
  - Provides `onRedirectLogin` and `onRedirectAccount` callbacks for navigation

- **Container Responsibility** (handled by dropin):
  - Validates `allowCompanyRegistration` backend permission
  - Checks if user belongs to a company via `isCompanyUser`
  - Shows appropriate UI based on user status
  - Manages redirects using provided callbacks

### User Interaction Flows

1. **Company Structure Display Flow** (Company users):
   - Container detects user has a company
   - Displays company organizational hierarchy
   - Provides user and team management capabilities
   - Enables structure modifications based on permissions

2. **Empty State Flow** (Non-company users):
   - Container detects user doesn't have a company
   - Shows company registration empty state
   - Provides link to company registration form
   - Explains benefits of company membership

3. **Redirect Flow** (Unauthenticated users or disabled features):
   - Container triggers redirect callbacks when needed
   - Unauthenticated users → redirected to login page
   - Registration disabled → redirected to customer account

### Data Management

The CompanyStructure container handles:

- **Company Structure**: Displays hierarchical organizational structure with teams and users
- **User Information**: Shows user details, roles, and permissions within the company structure
- **Team Information**: Displays team details and member assignments
- **Permission-Based Display**: Information visibility and edit capabilities are controlled by user role permissions
- **Real-time Updates**: Company structure is refreshed after successful modifications without full page reload

### Error Handling

- **Authentication Errors**: Container calls `onRedirectLogin()` for unauthenticated users
- **Registration Disabled**: Container calls `onRedirectAccount()` when backend disallows company registration
- **API Errors**: Container displays inline error messages for failed operations
- **Network Errors**: Container handles network failures gracefully with appropriate error messages

### Permission-Based Features

The CompanyStructure container provides permission-based features:

- **View Permissions**: Controls visibility of company structure, users, and teams
- **Edit Permissions**: Determines whether users can modify structure, add/remove users and teams
- **User Management Permissions**: Controls ability to add, edit, and remove company users
- **Team Management Permissions**: Controls ability to add, edit, and remove company teams
- **Role-Based Access**: Different user roles have different levels of access to structure management

## Technical Details

### Dependencies

- `@dropins/storefront-company-management` - Company management dropin
- `commerce.js` - Authentication and routing utilities

### CSS Classes

- `.commerce-company-structure-container` - Main container class applied to block
- Additional classes are provided by the dropin component

### Block Implementation

```javascript
export default async function decorate(block) {
  block.classList.add('commerce-company-structure-container');

  const isAuthenticated = checkIsAuthenticated();

  await provider.render(CompanyStructure, {
    isAuthenticated,
    onRedirectLogin: () => {
      window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    },
    onRedirectAccount: () => {
      window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    },
  })(block);
}
```

The block is intentionally simple - it only handles authentication detection and provides navigation callbacks, delegating all business logic to the CompanyStructure container.
