# Commerce B2B Negotiable Quote Template Block

## Overview

The Commerce B2B Negotiable Quote Template block provides a comprehensive interface for managing quote templates for authenticated B2B customers. It displays a list of quote templates with pagination controls and provides detailed template management including shipping address selection. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

**List View Configuration:**

| Configuration Key    | Type    | Default | Description                            | Required | Side Effects |
|----------------------|---------|---------|----------------------------------------|----------|--------------|
| `pageSize`           | number  | `10`    | Number of items per page               | No       | Sets pagination size |
| `showItemRange`      | boolean | `true`  | Shows the item range text              | No       | Displays item count (e.g., "1-10 of 25") |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker             | No       | Shows/hides page size dropdown |
| `showPagination`     | boolean | `true`  | Shows the pagination controls          | No       | Shows/hides pagination navigation |

**Details View Configuration:**

| Configuration Key    | Type    | Default | Description                                              | Required | Side Effects |
|----------------------|---------|---------|----------------------------------------------------------|----------|--------------|
| `minifiedView`       | boolean | `false` | Use minified view for address selection                  | No       | Affects address display layout |
| `withActionsInMinifiedView` | boolean | `false` | Show actions in minified address view            | No       | Controls action visibility |
| `selectable`         | boolean | `true`  | Allows address selection                                 | No       | Enables/disables address selection |
| `selectShipping`     | boolean | `true`  | Enable shipping address selection mode                   | No       | Sets selection mode to shipping |
| `defaultSelectAddressId` | number | `0`   | Default selected address ID (0 = none selected)          | No       | Pre-selects an address |

### URL Parameters

| Parameter          | Type   | Description                                                     | Required |
| ------------------ | ------ | --------------------------------------------------------------- | -------- |
| `quoteTemplateId` | string | Switches from list view to details view for specified template  | No       |

### Dependencies

**Dropins:**
- `@dropins/storefront-quote-management` - Provides quote template management containers and APIs
- `@dropins/storefront-account` - Provides address management functionality
- `@dropins/storefront-company-management` - Provides company verification APIs
- `@dropins/tools` - Provides UI components, form utilities, and event bus

**Containers:**
- `QuoteTemplatesListTable` - Renders the list of quote templates with pagination
- `ManageNegotiableQuoteTemplate` - Renders the quote template details view with management capabilities
- `Addresses` - Renders address selection and creation interface for shipping information

**APIs:**
- `companyEnabled()` - Checks if company functionality is enabled
- `getCompany()` - Retrieves company information for the authenticated user
- `addQuoteTemplateShippingAddress()` - Adds shipping address to a quote template

**UI Components:**
- `InLineAlert` - Displays error messages
- `ProgressSpinner` - Shows loading state during asynchronous operations


## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quote templates list or details view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Redirects to the customer account page
- **User Without Company**: Redirects to the customer account page

### User Interaction Flows

1. **Permissions Check**: Verifies user authentication, company functionality status, and company membership before rendering
2. **List View**: Displays all quote templates with pagination controls, filtering, and page size selection
3. **Details View**: Displays individual quote template details when accessed via `?quoteTemplateId={id}` parameter
   - Shows quote template management interface via `ManageNegotiableQuoteTemplate` container
   - Provides shipping information selection when the template can be sent for review
   - Allows users to select from existing addresses or create a new shipping address
   - Displays a progress spinner during shipping address operations
   - Automatically refreshes after shipping address is added

### Error Handling

- **Authentication Errors**: Redirects to login page (`CUSTOMER_LOGIN_PATH`)
- **Company Not Enabled**: Redirects to customer account page (`CUSTOMER_ACCOUNT_PATH`)
- **User Without Company**: Redirects to customer account page (`CUSTOMER_ACCOUNT_PATH`)
- **Permission Check Failures**: Prevent content rendering and immediately redirect
- **Quote Data Loading Errors**: Displays an inline error alert when quote data fails to load (via `quote-management/quote-data/error` event)
- **Container Errors**: If container fails to render, the block remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content

### Shipping Address Operations

When viewing quote template details and the template can be sent for review, the block provides shipping information selection:

- **Select Existing Address**: Users can choose from their saved addresses via the `Addresses` container
- **Create New Address**: Users can fill out a form to add a new shipping address with optional VAT ID and customer notes
- **Progress Indication**: A progress spinner is displayed while the shipping address is being added
- **Asynchronous Updates**: Address operations are handled asynchronously via the `addQuoteTemplateShippingAddress` API

### Event Listeners

The block subscribes to the following events:

| Event Name | Source | Purpose | Handler Action |
|------------|--------|---------|----------------|
| `quote-management/quote-data/error` | Quote Management Dropin | Triggered when quote data fails to load | Displays an inline error alert with the error message |

### Slots Implementation

The details view implements custom slots for the `ManageNegotiableQuoteTemplate` container:

**ShippingInformation Slot:**

This slot provides a custom shipping address selection interface that:
- Monitors template state changes via `onChange` callback
- Only displays when `templateData.canSendForReview` is true
- Renders the `Addresses` container with shipping selection mode enabled
- Handles two address submission workflows:
  1. **Existing Address Selection** (`onAddressData` callback):
     - Receives selected address UID
     - Validates address data
     - Calls `addQuoteTemplateShippingAddress` with `customerAddressUid`
  2. **New Address Creation** (`onSubmit` callback):
     - Collects form values including street lines, region, and optional VAT ID
     - Transforms form data into address input format
     - Calls `addQuoteTemplateShippingAddress` with complete address object
- Shows/hides progress spinner during API operations
- Toggles visibility of address selection UI during operations

### Callback Handlers

**List View:**

| Callback | Parameters | Purpose | Implementation |
|----------|-----------|---------|----------------|
| `onViewQuoteTemplate` | `id` (string) | Navigates to quote template details view | Updates URL with `quoteTemplateId` query parameter |

**Details View - ShippingInformation Slot:**

| Callback | Parameters | Purpose | Implementation |
|----------|-----------|---------|----------------|
| `onAddressData` | `{ data, isDataValid }` | Handles existing address selection | Extracts address UID and calls `addQuoteTemplateShippingAddress` API |
| `onSubmit` | `event, formValid` | Handles new address form submission | Transforms form data and calls `addQuoteTemplateShippingAddress` API |
| `onChange` | `next` (template state) | Monitors template data changes | Updates shipping information UI based on `canSendForReview` status |
