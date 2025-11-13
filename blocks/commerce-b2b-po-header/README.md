# Commerce B2B PO Header Block

## Overview

The Commerce B2B PO Header block renders a dynamic header for purchase order pages using the @dropins/tools Header component. It provides contextual navigation and title updates based on the current page and purchase order data.

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

| Event Name            | Payload                    | Description                                                     | Side Effects                                                            |
| --------------------- | -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `purchase-order/data` | `purchaseOrderData` object | Listens for purchase order data to update header with PO number | Updates header title from "Purchase order" to "Purchase order {number}" |

<!-- #### Event Emitters

No events are emitted by this block. -->

## Behavior Patterns

### Page Context Detection

- **Purchase Order Details Page**: When URL includes configured `CUSTOMER_PO_DETAILS_PATH` (`/customer/purchase-order-details`), displays back navigation link
- **Other Pages**: On non-details pages, displays header without navigation link

### User Interaction Flows

1. **Initial Render**: Block renders with default "Purchase order" title
2. **Page Type Check**: Checks if current URL includes purchase order details path
3. **Navigation Link**: If on details page, displays "Back to all POs" link (from placeholders) pointing to configured `CUSTOMER_PO_LIST_PATH` (`/customer/purchase-orders`)
4. **Data Updates**: Listens for `purchase-order/data` event and updates header title with purchase order number when available
5. **Dynamic Title**: Header title changes from "Purchase order" to "Purchase order {number}" when PO data loads

### Error Handling

- **Missing Placeholders**: If placeholder text for back link is missing, link will render without text
- **Missing PO Data**: If `purchase-order/data` event provides invalid or missing data, header maintains default title
- **Event Listener Errors**: Uses eager event listener to ensure early data capture, gracefully handles missing event data
