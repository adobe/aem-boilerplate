# Commerce Addresses Block

## Overview

The Commerce Addresses block renders a customer address management interface using the @dropins/storefront-account Addresses container. It provides functionality for viewing, adding, editing, and deleting customer addresses with authentication protection and configurable view modes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `minified-view` | string | `'false'` | Controls whether addresses are displayed in minified or full view mode | No | Changes the visual layout and available actions |

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No direct event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Authenticated Users**: When user is authenticated, renders the full address management interface
- **Unauthenticated Users**: When user is not authenticated, redirects to the login page
- **Minified View**: When `minified-view` is 'true', displays addresses in a compact format with limited actions
- **Full View**: When `minified-view` is 'false', displays addresses in full format with all available actions

### User Interaction Flows

1. **Authentication Check**: Block first verifies user authentication status
2. **Redirect Flow**: If not authenticated, redirects to login page
3. **Address Management**: If authenticated, renders address management interface with view mode based on configuration
4. **Address Actions**: Users can view, add, edit, and delete addresses based on the configured view mode

### Error Handling

- **Authentication Errors**: If user is not authenticated, automatically redirects to login page
- **Configuration Errors**: If `readBlockConfig()` fails, uses default minified view setting
- **Render Errors**: If the Addresses container fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to full view mode if configuration is invalid
