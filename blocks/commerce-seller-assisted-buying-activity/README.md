# Commerce Seller Assisted Buying Activity Block

## Overview

The Commerce Seller Assisted Buying Activity block renders the customer's seller assisted buying activity history using the @dropins/storefront-account SellerAssistedBuyingActivity container. It requires user authentication and redirects unauthenticated users to the login page.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

### Container Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `withWrapper` | boolean | `false` | Controls whether the activity table is rendered inside the dropin card wrapper | No | Keeps the table unwrapped so the page layout can provide the surrounding account page structure |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, renders the seller assisted buying activity interface
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **Feature Enabled**: When remote shopping assistance is available, displays activity records in a paginated table
- **Feature Disabled**: When remote shopping assistance is unavailable, displays the dropin feature-disabled message

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Activity Loading**: If authenticated, renders the SellerAssistedBuyingActivity container and loads recent seller assisted buying actions
4. **Activity Review**: Users can review action, date, and detail columns for seller assisted buying activity
5. **Pagination**: Users can move between pages when more activity records are available

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Feature Availability Errors**: If remote shopping assistance is disabled or unavailable, the container displays a warning message
- **Data Loading Errors**: If activity records fail to load, the container displays an error state
- **Empty State**: If no activity records are available, the container displays an empty state message
- **Container Errors**: If the SellerAssistedBuyingActivity container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated
