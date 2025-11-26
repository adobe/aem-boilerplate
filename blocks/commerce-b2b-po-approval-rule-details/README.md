# Commerce B2B PO Approval Rule Details Block

## Overview

The Commerce B2B PO Approval Rule Details block renders detailed information about a specific purchase order approval rule using the @dropins/storefront-purchase-order ApprovalRuleDetails container. It provides rule detail viewing with authentication protection, permission-based access control, and navigation capabilities for returning to the approval rules list.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

### URL Parameters

| Parameter | Type   | Description                                 | Required | Side Effects                                            |
| --------- | ------ | ------------------------------------------- | -------- | ------------------------------------------------------- |
| `ruleRef` | string | The unique identifier for the approval rule | Yes      | Missing parameter redirects to approval rules list page |

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

| Event Name              | Payload                   | Description                                                          | Side Effects                                                                      |
| ----------------------- | ------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `auth/permissions`      | `permissions` object      | Listens for permission changes to update block visibility and access | Re-renders the block with updated permissions, shows/hides based on access rights |
| `companyContext/changed`| –                         | Listens for company context switching events                         | Redirects to approval rules list page when company context changes                |
| `authenticated`         | `isAuthenticated` boolean | Listens for authentication status changes                            | Redirects to login page when user becomes unauthenticated                         |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Admin Users**: When user has admin permissions, displays approval rule details
- **View Permission**: When user has `Magento_PurchaseOrderRule::view_approval_rules` permission (via `PO_PERMISSIONS.VIEW_RULES` constant), displays rule details
- **No Access**: When user lacks required permissions, redirects to account dashboard page
- **Missing Rule ID**: When `ruleRef` URL parameter is missing or empty, redirects to approval rules list page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Permission Check**: If authenticated and B2B module enabled, checks for admin or view approval rules permission
6. **Access Redirect**: If lacking permissions, redirects to account dashboard page
7. **Rule ID Validation**: Checks for presence of `ruleRef` URL parameter
8. **Missing ID Redirect**: If `ruleRef` is missing, redirects to approval rules list page at configured `CUSTOMER_PO_RULES_PATH` (`/customer/approval-rules`)
9. **Rule Details Display**: If authorized and valid rule ID exists, renders approval rule details
10. **List Navigation**: Provides route to return to approval rules list at configured `CUSTOMER_PO_RULES_PATH`
11. **Permission Updates**: Listens for permission changes and re-renders accordingly
12. **Company Context Changes**: Redirects to approval rules list page when company context is switched
13. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Missing Rule ID**: If `ruleRef` parameter is missing or empty, redirects to approval rules list page
- **Container Errors**: If the ApprovalRuleDetails container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, account dashboard redirect if B2B module disabled or no access, or approval rules list redirect if no rule ID
