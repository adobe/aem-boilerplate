# Commerce Account Navigation Block

## Overview

The Commerce Account Navigation block renders a navigation menu for customer account pages. It processes tabular data to create multiple navigation items with icons, titles, descriptions, and permission-based visibility. Each item includes active state detection and a collapsible menu toggle. The block integrates with the storefront-auth API to fetch user role permissions for dynamic access control, including special handling for company administrators.

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
- **Permission**: From the permission column (controls visibility)

### API Integration

The block uses the `getCustomerRolePermissions()` function from `@dropins/storefront-auth/api.js` to fetch user role permissions. This API handles all caching, error handling, and permission processing internally.

#### Permission Logic

The block implements a two-tier permission system:

1. **Admin Access**: If user has `admin: true` permission, they can access all navigation items regardless of specific permissions
2. **Standard Access**: If user is not an admin, they can only access items where they have the specific required permission
3. **Default Permission**: If no specific permission is defined for an item, it defaults to "all" (accessible to everyone)

**Permission Check Flow:**
```javascript
// Show item if user is admin OR has specific permission
if (!permissions.admin && !permissions[permission]) {
  return; // Hide item
}
```

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
2. **Permission Fetching**: Calls `getCustomerRolePermissions()` API which handles all caching and processing internally
3. **Permission Filtering**: Each item checks permission column against available permissions using enhanced logic:
   - Shows item if user has `admin` permission (overrides all other checks)
   - Shows item if user has the specific required permission
   - Default permission is 'all' (granted to all users)
4. **Navigation Item Creation**: For each permitted item, creates a clickable link with:
   - Icon (24px size, only rendered if icon is provided)
   - Title text from link element
   - Description text from second paragraph
   - Active state detection based on URL pathname matching
5. **Collapsible Menu**: If container has `.commerce-account-nav-container` class, adds toggle button:
   - Initial state: "Hide Menu" with Minus icon
   - Toggles container's `--collapsed` modifier class
   - Button text and icon update dynamically ("Show Menu"/"Hide Menu", "Add"/"Minus")
6. **Navigation**: Clicking any navigation item navigates to the extracted link URL

### Error Handling

- **Missing Column Headers**: Uses `Math.max(0, indexOf() + 1)` to prevent invalid column indexes
- **Missing Content Elements**: Provides empty string fallbacks for title and description
- **API Failures**: Handled internally by `getCustomerRolePermissions()` API - may throw errors or return fallback permissions
- **Permission Processing**: If permissions are unavailable, falls back to default `all: true` behavior
