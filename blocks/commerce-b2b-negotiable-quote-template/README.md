# Commerce B2B Negotiable Quote Template Block

## Overview

The Commerce B2B Negotiable Quote Template block provides a comprehensive interface for managing quote templates for authenticated B2B customers. It displays a list of quote templates with pagination controls and prepares for future template detail viewing. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

| Configuration Key    | Type    | Default | Description                            | Required | Side Effects |
|----------------------|---------|---------|----------------------------------------|----------|--------------|
| `pageSize`           | number  | `10`    | Number of items per page               | No       | Sets pagination size |
| `showItemRange`      | boolean | `true`  | Shows the item range text              | No       | Displays item count (e.g., "1-10 of 25") |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker             | No       | Shows/hides page size dropdown |
| `showPagination`     | boolean | `true`  | Shows the pagination controls          | No       | Shows/hides pagination navigation |

### URL Parameters

| Parameter          | Type   | Description                                                     | Required |
| ------------------ | ------ | --------------------------------------------------------------- | -------- |
| `quoteTemplateId` | string | Switches from list view to details view for specified template  | No       |


## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quote templates list or details view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Redirects to the customer account page
- **User Without Company**: Redirects to the customer account page

### User Interaction Flows

1. **Permissions Check**: Verifies user authentication, company functionality status, and company membership before rendering
2. **List View**: Displays all quote templates with pagination controls, filtering, and page size selection
3. **Details View**: (Not yet implemented) Will display individual quote template details when accessed via `?quoteTemplateId={id}` parameter

### Error Handling

- **Authentication Errors**: Redirects to login page (`CUSTOMER_LOGIN_PATH`)
- **Company Not Enabled**: Redirects to customer account page (`CUSTOMER_ACCOUNT_PATH`)
- **User Without Company**: Redirects to customer account page (`CUSTOMER_ACCOUNT_PATH`)
- **Permission Check Failures**: Prevent content rendering and immediately redirect
- **Container Errors**: If container fails to render, the block remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content
