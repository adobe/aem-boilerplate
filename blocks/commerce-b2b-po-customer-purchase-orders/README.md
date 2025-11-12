# Commerce B2B Customer Purchase Orders Block

## Overview

The Commerce B2B Customer Purchase Orders block renders a list of customer's own purchase orders using the @dropins/storefront-purchase-order CustomerPurchaseOrders container. It provides purchase order management with authentication protection, permission-based access control, and configurable pagination.

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

| Event Name         | Payload                   | Description                                                          | Side Effects                                                                      |
| ------------------ | ------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `auth/permissions` | `permissions` object      | Listens for permission changes to update block visibility and access | Re-renders the block with updated permissions, shows/hides based on access rights |
| `authenticated`    | `isAuthenticated` boolean | Listens for authentication status changes                            | Redirects to login page when user becomes unauthenticated                         |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Global PO Access Check**: First checks if user has admin or `Magento_PurchaseOrder::all` permission (via `PO_PERMISSIONS.PO_ALL` constant) to determine access to any PO containers and prevent premature redirects on multi-block pages
- **No Access to PO**: When user lacks both admin and `PO_ALL` permissions, redirects to account dashboard page
- **Block-Specific Permission Check**: For this block, checks if user has admin or `Magento_PurchaseOrder::view_purchase_orders` permission (via `PO_PERMISSIONS.VIEW_CUSTOMER` constant)
- **No Access to Block**: When user lacks access to this specific block but has access to other PO blocks, hides the entire block container

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Global PO Access Check**: Checks if user has admin or `PO_ALL` permission (prevents redirect when other PO blocks are accessible on the same page)
6. **Account Dashboard Redirect**: If lacking global PO access, redirects to account dashboard page
7. **Block-Specific Permission Check**: Checks for admin or customer purchase order permission (`VIEW_CUSTOMER`) for this specific block
8. **Block Visibility**: Shows or hides the entire block container based on block-specific permission check (prevents layout issues)
9. **Orders Display**: If authorized, renders customer purchase orders with pagination using default dropin configuration
10. **Permission Updates**: Listens for permission changes and re-renders accordingly
11. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Global Permission Errors**: If user lacks access to all PO containers, redirects to account dashboard page
- **Block Permission Errors**: If user lacks access to this specific block, hides block and clears content to prevent layout issues
- **Container Errors**: If the CustomerPurchaseOrders container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if B2B module disabled or no PO access, or hides block if no block-specific access
