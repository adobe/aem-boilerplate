# Commerce B2B PO Approval Flow Block

## Overview

The Commerce B2B PO Approval Flow block renders the approval workflow for a purchase order using the @dropins/storefront-purchase-order PurchaseOrderApprovalFlow container. It displays approval rules, their statuses, and associated events with visual indicators for approved, rejected, and pending states.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

| Event Name            | Payload                    | Description                                                          | Side Effects                                                                      |
| --------------------- | -------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `auth/permissions`    | `permissions` object       | Listens for permission changes to update block visibility and access | Re-renders the block with updated permissions, shows/hides based on access rights |
| `authenticated`       | `isAuthenticated` boolean  | Listens for authentication status changes                            | Redirects to login page when user becomes unauthenticated                         |
| `purchase-order/data` | `purchaseOrderData` object | Listens for purchase order data to display approval flow             | Updates displayed approval flow with current PO data                              |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Admin Users**: When user has admin permissions, displays approval flow
- **View Permission**: When user has `Magento_PurchaseOrder::view_approval` permission (via `PO_PERMISSIONS.VIEW_CUSTOMER` constant), displays approval flow
- **No Access**: When user lacks required permissions, redirects to account dashboard page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Permission Check**: If authenticated and B2B module enabled, checks for admin or view approval permissions
6. **Access Redirect**: If lacking permissions, redirects to account dashboard page
7. **Approval Flow Display**: If authorized, renders approval flow with visual status indicators
8. **Status Indicators**: Displays icons for APPROVED (green checkmark), REJECTED (red alert), and PENDING (blue info) states
9. **Rule Information**: Shows rule names and associated approval/rejection events with timestamps
10. **Permission Updates**: Listens for permission changes and re-renders accordingly
11. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Container Errors**: If the PurchaseOrderApprovalFlow container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if B2B module disabled or no access
