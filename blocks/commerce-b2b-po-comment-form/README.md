# Commerce B2B PO Comment Form Block

## Overview

The Commerce B2B PO Comment Form block renders a form for adding comments to a purchase order using the @dropins/storefront-purchase-order PurchaseOrderCommentForm container. It provides comment submission functionality with authentication protection, permission-based access control, and real-time purchase order data refresh.

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
| `purchase-order/data` | `purchaseOrderData` object | Listens for purchase order data to enable comment submission         | Updates form with current PO UID for comment submission                           |

#### Event Emitters

| Event Name               | Payload | Description                          | When Emitted                        |
| ------------------------ | ------- | ------------------------------------ | ----------------------------------- |
| `purchase-order/refresh` | `true`  | Triggers purchase order data refresh | After successful comment submission |

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, checks permissions before rendering
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
- **B2B Module Disabled**: When B2B module is disabled, redirects to account dashboard page
- **Admin Users**: When user has admin permissions, displays comment form
- **View Permission**: When user has `Magento_PurchaseOrder::view_approval` permission (via `PO_PERMISSIONS.VIEW_CUSTOMER` constant), displays comment form
- **No Access**: When user lacks required permissions, redirects to account dashboard page

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **B2B Module Check**: Checks if B2B module is enabled via `commerce-b2b-enabled` configuration flag
4. **B2B Module Disabled Redirect**: If B2B module is disabled, redirects to account dashboard page
5. **Permission Check**: If authenticated and B2B module enabled, checks for admin or view approval permissions
6. **Access Redirect**: If lacking permissions, redirects to account dashboard page
7. **Form Display**: If authorized, renders comment form with text area and submit button
8. **Comment Input**: User enters comment text in the text area
9. **Validation**: Submit button is disabled if comment is empty or PO UID is missing
10. **Submission**: On submit, sends comment to backend via `addPurchaseOrderComment` API
11. **Success Handling**: On success, triggers `purchase-order/refresh` event and clears comment text
12. **Error Handling**: On error, displays error message below text area
13. **Permission Updates**: Listens for permission changes and re-renders accordingly
14. **Logout Handling**: Redirects to login page if user logs out during interaction

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **B2B Module Disabled**: If B2B module is disabled via configuration, redirects to account dashboard page
- **Permission Errors**: If user lacks required permissions, redirects to account dashboard page
- **Missing PO UID**: If purchase order UID is missing, submit button remains disabled
- **Empty Comment**: If comment text is empty, submit button remains disabled
- **API Errors**: If comment submission fails, displays error message and keeps comment text
- **Container Errors**: If the PurchaseOrderCommentForm container fails to render, the block content remains empty
- **Permission Update Errors**: If permission events provide invalid data, uses empty permissions object as fallback
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated, or account dashboard redirect if B2B module disabled or no access
