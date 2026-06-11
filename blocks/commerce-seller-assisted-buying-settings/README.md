# Commerce Seller Assisted Buying Settings Block

## Overview

The Commerce Seller Assisted Buying Settings block renders customer preferences for seller assisted buying using the @dropins/storefront-account SellerAssistedBuyingSettings container. It lets authenticated customers enable or disable remote shopping assistance when the store supports the feature.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. -->

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

- **Authenticated Users**: When user is authenticated, renders the seller assisted buying settings control
- **Unauthenticated Users**: When user is not authenticated, redirects to login page
- **Feature Enabled**: When remote shopping assistance is available, displays a checkbox for customer opt-in or opt-out
- **Feature Disabled**: When remote shopping assistance is unavailable, displays the dropin feature-disabled message

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Settings Loading**: If authenticated, renders the SellerAssistedBuyingSettings container and loads remote shopping assistance configuration
4. **Preference Management**: Users can toggle whether they allow remote shopping assistance
5. **Inline Feedback**: When a user disables assistance, the container can display a dismissible warning message
6. **Tooltip Display**: If configured by the backend, users can view tooltip text for the setting

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Feature Availability Errors**: If remote shopping assistance is disabled or unavailable, the container displays a warning message
- **Data Loading Errors**: If customer preference data fails to load, the container logs the error and falls back to the default disabled state
- **Update Errors**: If preference updates fail, the container logs the error and reverts the checkbox state
- **Container Errors**: If the SellerAssistedBuyingSettings container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to login page redirect if not authenticated
