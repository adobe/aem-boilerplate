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
# Commerce Company Accept Invitation Block

## Overview

The Commerce Company Accept Invitation block handles the acceptance of company invitations sent via email. It uses the @dropins/storefront-company-management AcceptInvitation container to automatically process invitation links and display the result.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### URL Parameters

The AcceptInvitation container automatically parses the following URL parameters from the invitation email link:

- `code` (required): The invitation verification code
- `customer[customer_id]` (required): The customer ID (base64-encoded UID)
- `customer[company_id]` (required): The company ID (base64-encoded UID)
- `customer[job_title]` (optional): The job title for the company user
- `customer[telephone]` (optional): The telephone number
- `customer[status]` (optional): The user status (1 for ACTIVE, 0 for INACTIVE)

Example URL:
```
/company/customer/acceptinvitation/?code=abc123&customer[customer_id]=OTE%3D&customer[company_id]=NDQ%3D&customer[job_title]=Manager&customer[telephone]=555-0123&customer[status]=1
```

Note: The customer_id and company_id values in the URL are already base64-encoded UIDs (e.g., `OTE=` for customer ID 91, `NDQ=` for company ID 44). The AcceptInvitation hook will encode them again before sending to the GraphQL API.

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Session Storage

The block interacts with session storage for company context management:

- `ADOBE_COMPANY_ID`: Set after successful invitation acceptance (only for authenticated users)
- `ADOBE_CUSTOMER_GROUP`: Cleared after successful invitation acceptance (only for authenticated users)

This enables seamless company context switching when users navigate to other pages after accepting an invitation.

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Company Disabled**: When B2B company features are not enabled, displays error message with no action buttons
- **Valid Invitation**: When all required URL parameters are present, processes the invitation automatically
- **Invalid Link**: When required parameters are missing, displays error message with action button
- **Processing State**: Shows loading state while API call is in progress
- **Authentication-Aware**: Displays different action buttons based on user authentication state

### User Interaction Flows

#### Non-Authenticated User Flow

1. **Company Check**: Container verifies that B2B company features are enabled using `companyEnabled()` API
2. **URL Validation**: Container validates that required URL parameters (code, customer_id, company_id) are present
3. **Loading State**: Displays "Processing your invitation..." message with progress spinner
4. **API Call**: Automatically calls `acceptCompanyInvitation` API with parsed and base64-encoded parameters
5. **Header Removal**: Temporarily removes `X-Adobe-Company` header during API call to avoid validation errors
6. **URL Cleanup**: After successful acceptance (or error), clears URL parameters from address bar
7. **Success Handling**: Shows success message with "Go to Login" button
8. **Error Handling**: Shows error message with "Go to Login" button (except when company is disabled)

#### Authenticated User Flow

1. **Company Check**: Same as non-authenticated flow
2. **URL Validation**: Same as non-authenticated flow
3. **Loading State**: Same as non-authenticated flow
4. **API Call**: Same as non-authenticated flow
5. **Header Removal**: Same as non-authenticated flow
6. **Company Context Switch**: After successful acceptance, attempts to switch company context:
   - Fetches customer company information using `getCustomerCompany()` API
   - Verifies the logged-in customer ID matches the invited customer ID
   - Sets company ID in session storage if no company context exists
   - Clears customer group from session storage to force refresh
7. **URL Cleanup**: After successful acceptance (or error), clears URL parameters from address bar
8. **Success Handling**: Shows success message with "My Account" button
9. **Error Handling**: Shows error message with "My Account" button (except when company is disabled)

### Company Context Switching

The block implements Luma-compatible company context switching for authenticated users:

1. **Customer Verification**: Checks if the logged-in customer matches the invited customer
2. **Session Check**: Only switches context if there's no existing company ID in session storage
3. **Context Update**: Sets the company ID in session storage and clears customer group
4. **Lazy Application**: The actual company context (headers, customer group) is applied on next page load by the company-switcher dropin
5. **Error Handling**: If "Already assigned to a company" error occurs after successful initial acceptance, treats it as success

This ensures that:
- Users are automatically switched to their new company context
- Existing company context is not overwritten
- The invited customer is the one accepting the invitation
- Company context persists across page navigation

### Error Handling

- **Company Disabled**: If B2B features are not enabled, displays "Company functionality is not enabled" error (no action buttons shown)
- **Missing Parameters**: If required URL parameters are missing, displays "Invalid invitation link" error with action button
- **API Errors**: If API call fails, displays specific error message with action button
- **Expired/Used Invitations**: If invitation fails validation, displays "This invitation link has expired or is no longer valid" message with action button
- **Customer Mismatch**: If authenticated user doesn't match invited customer, displays "This invitation was sent to a different customer" error
- **Already Accepted**: If invitation was already accepted (subsequent page load), treats as success and shows success message
- **Network Errors**: If network fails, displays "An error occurred while processing your invitation" message with action button
- **Fallback Behavior**: All error states (except company disabled) provide navigation options (login for non-authenticated, account for authenticated)
