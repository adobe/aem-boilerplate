# Commerce Account Header Block

## Overview

The Commerce Account Header block renders a standardized header component for account-related pages using the @dropins/tools Header component. It provides a consistent visual header with configurable title text for customer account sections.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `title` | string | `'My account'` | The header title text displayed to users | No | Changes the displayed header text |

<!-- ### URL Parameters

No URL parameters affect this block's behavior. -->

<!-- ### Local Storage

No localStorage keys are used by this block. -->

<!-- ### Events

#### Event Listeners

No event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Account Pages**: When used on customer account pages, displays the configured title (default: "My account")
- **All Contexts**: Consistently renders a header component regardless of page context

### User Interaction Flows

1. **Page Load**: Block initializes, reads configuration, clears existing content, and renders the Header component with the specified title

### Error Handling

- **Configuration Errors**: If `readBlockConfig()` fails, the block uses the default title "My account"
- **Render Errors**: If the Header component fails to render, the block content remains empty
- **Fallback Behavior**: Always falls back to the default title if no configuration is provided
