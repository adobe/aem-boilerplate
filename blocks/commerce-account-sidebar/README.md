# Commerce Account Sidebar Block

## Overview

The Commerce Account Sidebar block creates a dynamic navigation sidebar for customer account pages by loading configuration from a fragment and rendering interactive menu items with icons, titles, subtitles, and navigation arrows. It automatically detects the current page and highlights the active menu item.

## Integration

<!-- ### Block Configuration

No block configuration is read via `readBlockConfig()` -->

### URL Parameters

No URL parameters are directly read, but the block uses `window.location.href` to determine which menu item should be highlighted as active by comparing the current URL with menu item links.

<!-- ### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

No event listeners are implemented in this block.

#### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Orders Page**: When on the orders page (`CUSTOMER_ORDERS_PATH`), the orders menu item is highlighted as active
- **Other Account Pages**: When on other account pages, menu items are highlighted based on URL matching
- **Fragment Loading**: Loads sidebar configuration from `/customer/sidebar-fragment` on initialization

### User Interaction Flows

1. **Initialization**: Block loads the sidebar fragment, parses configuration, creates menu items, and renders them
2. **Menu Item Creation**: Each sidebar item is created with icon, title, subtitle, and chevron arrow
3. **Active State Detection**: Compares current URL with menu item links to determine which item should be active
4. **Navigation**: Clicking menu items navigates to the configured links

### Error Handling

- **Fragment Loading Errors**: If fragment loading fails, the block will not render any menu items
- **Missing Configuration**: If sidebar fragment is missing or malformed, no menu items are created
- **Icon Rendering Errors**: If icon rendering fails, the icon container is still created but may be empty
- **Fallback Behavior**: Uses default values for missing configuration (title: "Default Title", link: "#", icon: "Placeholder")
