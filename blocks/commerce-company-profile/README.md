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
# Commerce Company Profile Block

## Overview

The Commerce Company Profile block provides company profile management functionality for B2B customers using the @dropins/storefront-company-management CompanyProfile container. It requires user authentication, company functionality to be enabled, and the customer to have an associated company. Users without these requirements are redirected to appropriate pages.

## Integration

### Block Configuration
The block can be configured with the following options via `readBlockConfig()`:

- **className** (string, optional): CSS class for additional styling customization of the CompanyProfile component
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
3. **Edit Mode**: Users with edit permissions can toggle to edit mode to modify company information
4. **Form Submission**: Company updates are submitted via GraphQL API with proper error handling
5. **Success/Error Feedback**: Inline alerts provide feedback for successful updates or errors

### Data Management

- **Company Data**: Displays company name, email, legal name, VAT/Tax ID, reseller ID, and legal address
- **Contact Information**: Shows company administrator and sales representative details
- **Payment/Shipping Methods**: Lists available payment and shipping methods for the company
- **Permission-Based Display**: Information visibility is controlled by user role permissions
- **Real-time Updates**: Company data is refreshed after successful updates without full page reload

### Error Handling

- **Authentication Errors**: Redirects to login page if user is not authenticated
- **Company Functionality Errors**: Redirects to customer account if B2B functionality is disabled
- **Company Association Errors**: Redirects to customer account if customer has no company
- **API Errors**: Displays inline error messages for failed company updates
- **Network Errors**: Handles network failures gracefully with appropriate error messages
- **Fallback Behavior**: Always falls back to appropriate redirect pages for authentication/authorization failures

### Permission-Based Features

- **View Permissions**: Controls visibility of company account information, addresses, contacts, payment, and shipping information
- **Edit Permissions**: Determines whether users can edit company account information and addresses
- **Role-Based Access**: Different user roles within the company have different levels of access to company data
