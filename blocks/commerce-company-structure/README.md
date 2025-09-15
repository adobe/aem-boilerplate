<!-- ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** -->
# Commerce Company Structure Block

## Overview

The Commerce Company Structure block provides company organizational structure management functionality for B2B customers using the @dropins/storefront-company-management CompanyStructure container. It requires user authentication, company functionality to be enabled, and the customer to have an associated company. Users without these requirements are redirected to appropriate pages.

## Integration

### Block Configuration
The block can be configured with the following options via `readBlockConfig()`:

- **className** (string, optional): CSS class for additional styling customization of the CompanyStructure component
- **withHeader** (boolean, optional, default: true): Controls whether the container header is visible or not
- **slots** (object, optional): Slot configuration for customizing company structure display
  - **CompanyStructureData** (SlotProps, optional): Slot for customizing how company structure data is rendered

Example configuration:
```javascript
const config = readBlockConfig(block);
// config = {
//   className: 'custom-company-structure',
//   withHeader: false,
//   slots: { CompanyStructureData: customSlot }
// }
```

### URL Parameters
No URL parameters are used by this block. The block's behavior is determined solely by authentication status, company functionality availability, and user permissions.

### Local Storage
The block itself doesn't use localStorage, but the underlying CompanyStructure container uses sessionStorage for caching:

- **_company_structure**: Caches company structure data in sessionStorage to avoid repeated API calls for organizational hierarchy information

### Events
#### Event Listeners
No direct event listeners are implemented in this block.

#### Event Emitters
The block emits analytics events through the Adobe Client Data Layer (ACDL):

- **COMPANY_STRUCTURE_EVENT** (`company-structure`): Emitted when company structure is successfully modified
  - Event type: `company`
  - Event action: `structure`
  - Event data: Contains the modified structure data and company ID
  - Purpose: Analytics tracking for company structure modifications

## Behavior Patterns

### Authentication and Authorization Flow

- **Authentication Check**: Block first verifies user authentication status using `checkIsAuthenticated()`
- **Company Functionality Check**: Verifies that B2B company functionality is enabled using `checkIsCompanyEnabled()`
- **Company Association Check**: Ensures the authenticated customer has an associated company using `getCompany()`
- **Redirect Behavior**: 
  - Unauthenticated users → redirected to login page
  - Authenticated users without company functionality → redirected to customer account page
  - Authenticated users without company association → redirected to customer account page

### User Interaction Flows

1. **Initial Load**: Block performs authentication and company validation checks
2. **Company Structure Display**: If all checks pass, renders company organizational structure as an interactive tree
3. **Tree Navigation**: Users can expand/collapse nodes, select items, and view hierarchical relationships
4. **User Management**: Users with appropriate permissions can add, edit, and remove company users
5. **Team Management**: Users with appropriate permissions can add, edit, and remove company teams
6. **Drag and Drop**: Users can reorganize the company structure by dragging and dropping nodes
7. **Form Submission**: Structure modifications are submitted via GraphQL API with proper error handling
8. **Success/Error Feedback**: Inline alerts provide feedback for successful updates or errors

### Data Management

- **Company Structure**: Displays hierarchical organizational structure with teams and users
- **User Information**: Shows user details, roles, and permissions within the company structure
- **Team Information**: Displays team details and member assignments
- **Permission-Based Display**: Information visibility and edit capabilities are controlled by user role permissions
- **Real-time Updates**: Company structure is refreshed after successful modifications without full page reload
- **Tree State Management**: Maintains expanded/collapsed state and selection state for better user experience

### Error Handling

- **Authentication Errors**: Redirects to login page if user is not authenticated
- **Company Functionality Errors**: Redirects to customer account if B2B functionality is disabled
- **Company Association Errors**: Redirects to customer account if customer has no company
- **API Errors**: Displays inline error messages for failed structure modifications
- **Network Errors**: Handles network failures gracefully with appropriate error messages
- **Fallback Behavior**: Always falls back to appropriate redirect pages for authentication/authorization failures

### Permission-Based Features

- **View Permissions**: Controls visibility of company structure, users, and teams
- **Edit Permissions**: Determines whether users can modify company structure, add/remove users and teams
- **User Management Permissions**: Controls ability to add, edit, and remove company users
- **Team Management Permissions**: Controls ability to add, edit, and remove company teams
- **Role-Based Access**: Different user roles within the company have different levels of access to structure management

### Interactive Features

- **Tree Visualization**: Interactive tree component for navigating company hierarchy
- **Drag and Drop**: Reorganize company structure by dragging nodes to new positions
- **Expand/Collapse**: Users can expand or collapse tree nodes to focus on specific areas
- **Multi-Selection**: Select multiple items for bulk operations
- **Modal Forms**: Add/edit users and teams through modal dialogs
- **Confirmation Dialogs**: Confirm destructive actions like removing users or teams
- **Inline Editing**: Quick rename functionality for structure items
