# Commerce B2B PO Comments List Block

## Overview

The Commerce B2B PO Comments List block renders a list of comments for a purchase order using the @dropins/storefront-purchase-order PurchaseOrderCommentsList container. It provides comment viewing functionality with authentication protection, permission-based access control, pagination controls, and configurable visibility limits.

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
| `purchase-order/data` | `purchaseOrderData` object | Listens for purchase order data to display comments                  | Updates displayed comments list with current PO comments                          |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Admin Users**: When user has admin permissions, displays comments list
- **View Permission**: When user has `Magento_PurchaseOrder::view_approval` permission (via `PO_PERMISSIONS.VIEW_CUSTOMER` constant), displays comments list
- **No Access**: When user lacks required permissions, redirects to account dashboard page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Permission Check**: If authenticated and B2B module enabled, checks for admin or view approval permissions
6. **Access Redirect**: If lacking permissions, redirects to account dashboard page
7. **Comments Display**: If authorized, renders comments list in reverse chronological order (newest first)
8. **Initial Limit**: Displays first 5 comments by default (configurable via `visibleRecordsLimit` prop)
9. **Comment Details**: Shows comment author name (if available), timestamp, and comment text
10. **View More/Less**: If more than 5 comments exist, displays "View More" button to expand list
11. **Expansion**: On "View More" click, expands list to show all comments
12. **Collapse**: On "View Less" click, collapses list back to initial limit
13. **Empty State**: Displays "No comments available" message when no comments exist
14. **Permission Updates**: Listens for permission changes and re-renders accordingly
15. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **No Comments**: If purchase order has no comments, displays empty state message
- **Missing Author Data**: If comment author information is missing, displays timestamp only
- **Container Errors**: If the PurchaseOrderCommentsList container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if B2B module disabled or no access
