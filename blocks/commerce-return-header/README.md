# Commerce Return Header Block

## Overview

The Commerce Return Header block renders a dynamic header for return-related pages with conditional back navigation and return number display. It provides a standardized header that updates based on return data and page context.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()`. The block uses hardcoded configuration values and dynamic return data. -->

### URL Parameters

- `returnRef` - Return reference identifier used to extract and display the specific return number in the header title
- No direct URL parameter reading, but uses `window.location.href` to detect if the current page is a return details page (`CUSTOMER_RETURN_DETAILS_PATH`) to determine whether to show back navigation

<!-- ### Local Storage

No localStorage keys are used by this block. -->

### Events

#### Event Listeners

- `events.on('order/data', callback)` - Listens for order data updates to update header title with return number

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Return Details Page**: When on return details page (`CUSTOMER_RETURN_DETAILS_PATH`), shows back navigation link to returns list
- **Other Return Pages**: When on other return pages, shows standard return header without back navigation
- **Return Data Available**: When return data is available, updates header title to show return number

### User Interaction Flows

1. **Initialization**: Block renders header with default "Return" title
2. **Back Navigation**: If on return details page, adds back navigation link to returns list
3. **Return Data Update**: When order data is received, extracts return number and updates header title
4. **Navigation**: Users can click back link to return to returns list

### Error Handling

- **Placeholder Errors**: If placeholders fail to load, back navigation text may be missing
- **Return Data Errors**: If return data is invalid or missing, header falls back to default "Return" title
- **URL Parameter Errors**: If return reference is missing from URL, header shows default title
- **Configuration Errors**: No configuration errors possible as block uses hardcoded values
- **Fallback Behavior**: Always falls back to default "Return" title if return data is unavailable
