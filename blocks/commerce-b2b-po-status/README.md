# Commerce B2B PO Status Block

## Overview

The Commerce B2B PO Status block renders the current status and available actions for a purchase order using the @dropins/storefront-purchase-order PurchaseOrderStatus container. It provides status display, action buttons (approve, reject, cancel, place order), authentication protection, permission-based access control, and real-time status updates with alert notifications.

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
| `purchase-order/data` | `purchaseOrderData` object | Listens for purchase order data to display status and actions        | Updates status display and available action buttons                               |

#### Event Emitters

| Event Name               | Payload | Description                          | When Emitted                                            |
| ------------------------ | ------- | ------------------------------------ | ------------------------------------------------------- |
| `purchase-order/refresh` | `true`  | Triggers purchase order data refresh | After any action (approve, reject, cancel, place order) |

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Admin Users**: When user has admin permissions, displays status and actions
- **View Permission**: When user has `Magento_PurchaseOrder::view_approval` permission (via `PO_PERMISSIONS.VIEW_CUSTOMER` constant), displays status and actions
- **No Access**: When user lacks required permissions, redirects to account dashboard page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Permission Check**: If authenticated and B2B module enabled, checks for admin or view approval permissions
6. **Access Redirect**: If lacking permissions, redirects to account dashboard page
7. **Status Display**: If authorized, renders purchase order status with context-specific title and message:
   - `PENDING`: "Pending approval" - "Purchase order is awaiting approval"
   - `APPROVAL_REQUIRED`: "Approval required" - "Purchase order requires approval before it can be processed"
   - `APPROVED`: "Order approved" - "Purchase order has been approved"
   - `ORDER_IN_PROGRESS`: "Processing in progress" - "Purchase order is currently being processed"
   - `ORDER_PLACED`: "Order placed" - "Order has been placed successfully"
   - `ORDER_FAILED`: "Order failed" - "Order placing has failed"
   - `REJECTED`: "Order rejected" - "Purchase order has been rejected"
   - `CANCELED`: "Order canceled" - "Purchase order has been canceled"
   - `APPROVED_PENDING_PAYMENT`: "Order approved - pending payment" - "Purchase order has been approved and is awaiting payment"
8. **Action Buttons**: Displays action buttons based on available actions from purchase order data:
   - `APPROVE`: "Approve" button
   - `REJECT`: "Reject" button
   - `CANCEL`: "Cancel" button
   - `PLACE_ORDER`: "Place Order" button
9. **Action Execution**: On button click, executes corresponding API call and shows loading state
10. **Success Notification**: On successful action, displays success alert and triggers data refresh
11. **Error Notification**: On failed action, displays error alert with retry option
12. **Alert Dismissal**: User can dismiss alerts via close button
13. **Empty State**: When no actions are available, displays "No actions available for this purchase order"
14. **Permission Updates**: Listens for permission changes and re-renders accordingly
15. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Missing PO UID**: If purchase order UID is missing, block does not render
- **API Errors**: If action execution fails, displays error alert with specific error message
- **Approve Errors**: "An error occurred while approving the purchase order. Please try again"
- **Reject Errors**: "An error occurred while rejecting the purchase order. Please try again"
- **Cancel Errors**: "An error occurred while canceling the purchase order. Please try again"
- **Place Order Errors**: "An error occurred while placing the sales order. Please try again"
- **Container Errors**: If the PurchaseOrderStatus container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if B2B module disabled or no access
