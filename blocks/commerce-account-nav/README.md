# Commerce Account Navigation Block

## Overview

The Commerce Account Navigation block renders a navigation menu for customer account pages. It processes tabular data to create multiple navigation items with icons, titles, descriptions, and permission-based visibility. Each item includes active state detection and a collapsible menu toggle. The block integrates with the event bus to check user role permissions event emitted by auth dropin for dynamic access control, including special handling for company administrators.

## Integration

### HTML Structure

The block expects a tabular structure with a header row defining column names and data rows:

```html
<div>
  <div>
    <div><strong>label</strong></div>
    <div><strong>icon</strong></div>
    <div><strong>permission</strong></div>
  </div>
  <div>
    <div>
      <p><strong><a href="/customer/account">My account</a></strong></p>
      <p>Account details</p>
    </div>
    <div>User</div>
    <div>all</div>
  </div>
  <!-- Additional rows... -->
</div>
```

The block processes:
- **Header Row**: Defines column structure (label, icon, permission)
- **Data Rows**: Each row creates a navigation item
- **Title**: From the `<a>` element within the label column
- **Link**: From the `href` attribute of the `<a>` element
- **Description**: From the second `<p>` element in the label column
- **Icon**: From the icon column
- **Permission**: From the permission column (controls visibility, supports multiple permissions separated by newlines)

### Permission System

The block uses the event bus to retrieve user permissions via `'auth/permissions'` event (emitted by auth dropin). The permission system implements a three-state permission model to handle enabled, disabled, and missing permissions.

#### Permission Logic

The block implements a three-state permission system:

1. **Explicitly Disabled Permissions (`false`)**: Navigation items with permissions explicitly set to `false` are hidden for ALL users, including admins. This handles cases like disabled features (e.g., purchase orders disabled at system level).

2. **Granted Permissions (`true`)**: Navigation items are shown if:
   - User has `admin: true` permission (bypasses specific permission checks), OR
   - User has the specific permission set to `true`

3. **Missing/Undefined Permissions**: Navigation items are hidden for non-admin users if the permission is not defined (undefined)

4. **Default Permission**: If no specific permission is defined for an item, it defaults to "all" (accessible to everyone)

**Permission Check Flow:**

```javascript
const permission = "..."; // e.g., "Magento_PurchaseOrder::view_purchase_orders"

// Step 1: Hide if explicitly disabled (applies to everyone, including admins)
if (permissions[permission] === false) {
  return; // Skip rendering
}

// Step 2: Hide if user is not admin AND permission is not granted
if (!permissions.admin && !permissions[permission]) {
  return; // Skip rendering
}

// Otherwise: Show the navigation item
```

**Permission States:**

- `permission: true` → Show (if user is admin or has this permission)
- `permission: false` → Hide (explicitly disabled, even for admins)
- `permission: undefined` → Hide for non-admins, show for admins
- `permission: 'all'` (default) → Show for everyone

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

- **All Contexts**: The block renders consistently across all page contexts, creating multiple navigation items with permission-based visibility
- **Active State**: Automatically detects and highlights the navigation item that matches the current page URL
- **Permission-Based Rendering**: Only renders navigation items for which the user has the required permissions

### User Interaction Flows

1. **Page Load**: Block initializes, parses header row to determine column structure
2. **Permission Retrieval**: Retrieves user permissions from auth event bus via `events.lastPayload('auth/permissions')`
3. **Permission Filtering**: Each item checks its permission requirements using three-state logic:
   - **Explicitly Disabled (`false`)**: Hides item for ALL users (including admins) when permission is set to `false`
   - **Admin Override**: Shows item if user has `admin` permission and permission is not explicitly disabled
   - **Specific Permission**: Shows item if user has the specific permission set to `true`
   - **Default Permission**: Uses 'all' permission if no specific permission is defined (granted to all users)
4. **Navigation Item Creation**: For each permitted item, creates a clickable link with:
   - Icon (24px size, only rendered if icon is provided)
   - Title text from link element
   - Description text from second paragraph
   - Active state detection based on URL pathname matching
5. **Navigation**: Clicking any navigation item navigates to the extracted link URL

### Error Handling

- **Missing Column Headers**: Uses `Math.max(0, indexOf() + 1)` to prevent invalid column indexes
- **Missing Content Elements**: Provides empty string fallbacks for title and description
- **Missing Permissions**: If permissions payload is unavailable from event bus, may cause runtime errors when checking permissions
- **Permission Processing**: Handles empty or malformed permission text gracefully with default 'all' fallback
