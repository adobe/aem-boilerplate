# Quick Order Dropin Integration

## Overview

The Quick Order dropin provides bulk product ordering through three containers: QuickOrderItems (product list with search and cart operations), QuickOrderMultipleSku (multiple SKU text entry), and QuickOrderCsvUpload (CSV file upload). Containers coordinate via event-driven communication to enable quick ordering workflows.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description                                 | Required | Side Effects |
| ----------------- | ---- | ------- | ------------------------------------------- | -------- | ------------ |
| –                 | –    | –       | This block has no authorable configuration. | –        | –            |

### Events

#### Event Listeners

| Event Name                      | Payload               | Description                                           | Side Effects                                    |
| ------------------------------- | --------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| `quick-order/add-items`         | `SubmitSkuValue`      | Items added via CSV upload or SKU entry               | Fetches product data and updates list           |
| `quick-order/loading`           | `boolean`             | Loading state changed                                 | Disables inputs during processing               |
| `cart/product/added`            | `any[]`               | Products added to cart successfully                   | Shows success notification                      |
| `quick-order/add-to-cart-error` | `{ message: string }` | Add to cart operation failed                          | Shows error notification                        |

#### Event Emitters

| Event Name                | Payload          | Description                                                 | Side Effects                            |
| ------------------------- | ---------------- | ----------------------------------------------------------- | --------------------------------------- |
| `quick-order/add-items`   | `SubmitSkuValue` | Request to add items to list                                | Triggers product fetch                  |
| `quick-order/loading`     | `boolean`        | Loading state update                                        | Updates loading indicators              |
| `quick-order/add-to-cart` | `any[]`          | Request to add items to cart (when no custom handler used)  | Default cart processes items            |

## Behavior Patterns

### Page Context Detection

- **Quick Order Feature Toggle**: Feature disabled when `quickOrderActive` is `false` in store config
- **Disabled State**: All containers display overlay with message when feature is disabled

### User Interaction Flows

#### CSV File Upload

1. **File Selection**: User selects CSV file with SKU and QTY columns
2. **Validation**: System validates format (2 columns, max 200 rows, valid SKUs, and quantities)
3. **Error Display**: Invalid files show specific error messages
4. **Success**: Valid CSV emits `quick-order/add-items` event with parsed SKU/quantity data
5. **Product Fetch**: QuickOrderItems receives event and fetches product information
6. **Sample Download**: User can download sample CSV template

#### Multiple SKU Entry

1. **Text Input**: User enters SKUs separated by spaces, commas, or newlines
2. **Parsing**: System deduplicates SKUs and sums quantities for duplicates
3. **Add to List**: User clicks button to emit `quick-order/add-items` event
4. **Product Fetch**: QuickOrderItems receives event and fetches product information
5. **Textarea Clear**: Input clears on successful submission

#### Quick Order Product List

1. **Item Display**: Shows products with SKU, name, price, quantity, and options (if configurable)
2. **Product Search**: User searches for products using autocomplete, selects from results
3. **Option Selection**: Configurable products display options slot for configuration
4. **Quantity Update**: User adjusts quantities for each product
5. **Validation**: System validates all items (found products, required options, in stock)
6. **Add to Cart**: User clicks "Add All to Cart" button
7. **Cart Integration**: Custom `handleAddToCart` called or `quick-order/add-to-cart` event emitted
8. **Success Handling**: On success, shows notification and optionally clears list
9. **Error Handling**: On failure, shows error notification with details

#### Notifications

- **Validation Errors**: Displays warning when items have missing options or not found, SKUs clickable to scroll to item
- **Backend Errors**: Shows error message from API or custom handler
- **Partial Success**: Shows count of added items and list of failed SKUs
- **Full Success**: Shows success message with item count

### Error Handling

- **CSV Format Errors**: Invalid file type, missing/extra columns, max rows exceeded, invalid SKU/quantity values
- **Product Not Found**: SKU does not match any product, displays error state in list
- **Validation Errors**: Missing required options for configurable products, out of stock products
- **Add to Cart Errors**: Backend API failures, displays error notification with retry option
- **Partial Add Failures**: Some items succeed while others fail, shows both count and failed SKUs
- **Disabled State**: Feature disabled via config, shows overlay preventing all interactions
