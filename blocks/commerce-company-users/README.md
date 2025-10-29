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
# Commerce Company Users Block

## Overview

The Commerce Company Users block provides company user management functionality for B2B customers using the @dropins/storefront-company-management CompanyUsers container. It requires user authentication, company functionality to be enabled, and the customer to have an associated company. Users without these requirements are redirected to appropriate pages.

## Integration

### Block Configuration
The block can be configured with the following options via `readBlockConfig()`:

- **className** (string, optional): CSS class for additional styling customization of the CompanyUsers component
- **withHeader** (boolean, optional, default: true): Controls whether the container header is visible or not
- **slots** (object, optional): Slot configuration for customizing company data display
  - **CompanyData** (SlotProps, optional): Slot for customizing how company data is rendered

Example configuration:
```javascript
const config = readBlockConfig(block);
// config = {
//   className: 'custom-company-profile',
//   withHeader: false,
//   slots: { CompanyData: customSlot }
// }
```

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Authentication and Authorization Flow

- **Authentication Check**: Block first verifies user authentication status using `checkIsAuthenticated()`
- **Company Functionality Check**: Verifies that B2B company functionality is enabled using `companyEnabled()`
- **Company Association Check**: Ensures the authenticated customer has an associated company using `getCompany()`
- **Redirect Behavior**: 
  - Unauthenticated users → redirected to login page
  - Authenticated users without company functionality → redirected to customer account page
  - Authenticated users without company association → redirected to customer account page

### User Interaction Flows

1. **Initial Load**: Block performs authentication and company validation checks
2. **Company Profile Display**: If all checks pass, renders company profile with view-only information
3. **Edit Mode**: Users with edit permissions can toggle to edit mode to modify company users information
4. **Form Submission**: Company user updates are submitted via GraphQL API with proper error handling
5. **Success/Error Feedback**: Inline alerts provide feedback for successful updates or errors

### Data Management

- **Company Users**: Displays name, email, team, status of company users
- **Company User Status**: Edits company users status (Active / Inactive)
- **Company User Add**: Adds new users to the company
- **Company User Remove**: Removal of existing user from the company
- **Real-time Updates**: Company users data is refreshed after successful updates without full page reload

### Error Handling

- **Authentication Errors**: Redirects to login page if user is not authenticated

### Permission-Based Features
