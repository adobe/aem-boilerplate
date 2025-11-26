# Commerce B2B Negotiable Quote Block

## Overview

The Commerce B2B Negotiable Quote block provides two views for managing negotiable quotes for authenticated B2B customers:
1. **List View**: Displays all quotes using the `QuotesListTable` container
2. **Manage View**: Displays individual quote details using the `ManageNegotiableQuote` container with custom slots for checkout button and shipping address selection

It follows the `commerce-b2b-*` naming convention and initializes required drop-ins at the block level. This block requires company management functionality to be enabled and the user to be associated with a company.

## Integration

### Dependencies

- `@dropins/storefront-quote-management` - Quote management containers, renderer, and API
- `@dropins/storefront-account` - Account containers (Addresses) and renderer
- `@dropins/storefront-company-management` - Company permission checks
- `@dropins/tools/lib.js` - Form utilities
- `@dropins/tools/event-bus.js` - Event handling
- `@dropins/tools/components.js` - UI components (InLineAlert, Button, ProgressSpinner)
- `../../scripts/initializers/quote-management.js` - Quote management initialization
- `../../scripts/initializers/company.js` - Company management initialization
- `../../scripts/initializers/account.js` - Account initialization
- `../../scripts/commerce.js` - Authentication and utility functions

### Block Configuration

This block currently does not support configuration through block metadata. All settings are hardcoded in the implementation:

| Setting              | Type    | Value   | Description                            |
| -------------------- | ------- | ------- | -------------------------------------- |
| `showItemRange`      | boolean | `true`  | Shows the item range text              |
| `showPageSizePicker` | boolean | `true`  | Shows the page size picker             |
| `showPagination`     | boolean | `true`  | Shows the pagination controls          |

### URL Parameters

| Parameter | Type   | Description                                                    | Required |
| --------- | ------ | -------------------------------------------------------------- | -------- |
| `quoteid` | string | Switches from list view to manage view for the specified quote | No       |

**Note**: The parameter name is lowercase `quoteid` in the URL query string.

### Local Storage

No localStorage keys are used by this block.

### Events

#### Event Listeners

- `quote-management/quote-data/error` – Renders an error alert when quote data fails to load
- `quote-management/negotiable-quote-deleted` – Navigates back to quotes list after a quote is deleted (2-second delay)
- `quote-management/quote-duplicated` – Navigates to the newly duplicated quote (2-second delay)
- `quote-management/quote-items-removed` – Disables the checkout button when quote items are removed
- `quote-management/quantities-updated` – Disables the checkout button when item quantities are updated
- `quote-management/shipping-address-set` – Disables the checkout button when shipping address is set
- `companyContext/changed` – Removes `quoteid` from URL and reloads the page to show list view when company context changes

**Note**: Delete and duplicate listeners are automatically cleaned up using a MutationObserver when the block is removed from the DOM.

#### Event Emitters

This block does not directly emit events but uses containers that may emit events through the quote management and account drop-ins.

## Behavior Patterns

### Page Context Detection

- **Authenticated Users with Company**: Renders the quotes list or manage view based on URL parameters
- **Unauthenticated Users**: Redirects to the customer login page
- **Company Not Enabled**: Redirects to the customer account page
- **User Without Company**: Redirects to the customer account page

### View Switching

The block renders different views based on the presence of the `quoteid` URL parameter:

- **List View** (`data-quote-view="list"`): No `quoteid` parameter
  - Renders `QuotesListTable` container
  - Displays all quotes with pagination
  - "View" action adds `quoteid` to URL to switch to manage view

- **Manage View** (`data-quote-view="manage"`): When `quoteid` is present
  - Renders `ManageNegotiableQuote` container with custom slots:
    - **Footer slot**: Renders checkout button (enabled based on `quoteData.canCheckout`)
    - **ShippingInformation slot**: Renders shipping address selection when `quoteData.canSendForReview` is true
  - Navigates to `/b2b/quote-checkout?quoteId={quoteid}` on checkout
  - Sets up event listeners for delete and duplicate operations with automatic cleanup

### Shipping Address Selection

When a quote can be sent for review (`quoteData.canSendForReview === true`), the manage view displays:

- **Existing Addresses**: Renders the `Addresses` container from `@dropins/storefront-account` in selectable mode
  - Users can select from their saved addresses
  - On address selection, calls `setShippingAddress` API with the address UID
  - Shows a progress spinner during the address update

- **New Address Form**: Users can add a new shipping address
  - Form includes: firstName, lastName, company, street, city, region, postcode, countryCode, telephone, vatId
  - On submit, calls `setShippingAddress` API with the new address data
  - Optionally saves the address to the address book
  - Shows a progress spinner during the address save operation

### User Interaction Flows

1. **Permissions Check**:
   - Verifies user authentication
   - Checks if company functionality is enabled via `companyEnabled()`
   - Verifies user has a company via `getCompany()`
   - Redirects if any check fails

2. **List View Flow**:
   - Fetches and displays all quotes
   - Users can view, filter, and paginate quotes
   - Clicking "View" on a quote navigates to manage view with `quoteid` parameter

3. **Manage View Flow**:
   - Displays quote details and quoted items
   - If `quoteData.canSendForReview` is true:
     - Shows shipping address selection
     - Users can select existing address or add new address
     - Address updates trigger `setShippingAddress` API call
   - Shows checkout button if `quoteData.canCheckout` is true
   - Checkout button navigates to `/b2b/quote-checkout?quoteId={quoteid}`
   - Checkout button is disabled when quote items are removed, quantities updated, or shipping address is set
   - Quote deletion redirects to list view after 2 seconds
   - Quote duplication redirects to the new quote after 2 seconds

4. **Shipping Address Selection Flow**:
   - Only visible when quote can be sent for review
   - **Option 1 - Select Existing Address**:
     - User selects saved address from list
     - System validates address data
     - Calls `setShippingAddress({ quoteUid, addressId })`
     - Shows spinner during update
     - Disables checkout button after address is set
   - **Option 2 - Add New Address**:
     - User fills out address form
     - Form validation occurs before submission
     - Street addresses combined into array
     - Region code extracted from region field
     - VAT ID passed as additional input
     - Calls `setShippingAddress({ quoteUid, addressData })`
     - Shows spinner during save
     - Disables checkout button after address is saved

5. **Company Context Change Flow**:
   - When company context changes (user switches companies)
   - Removes `quoteid` parameter from URL
   - Replaces browser history state
   - Reloads page to display list view

### Error Handling

- **Authentication Errors**: Redirects to login page
- **Company Not Enabled**: Redirects to customer account page
- **User Without Company**: Redirects to customer account page (catches error from `getCompany()` API call)
- **Quote Data Load Errors**: Displays inline error alert with error message via `quote-management/quote-data/error` event
- **Shipping Address Errors**: Handled by `setShippingAddress` API with `.finally()` block to hide spinner regardless of success or failure
- **Address Form Validation**: Invalid forms prevent submission and do not trigger API calls
- **Container Errors**: If containers fail to render, the section remains empty
- **Fallback Behavior**: Permission checks occur before rendering any content
- **Event Listener Cleanup**: MutationObserver monitors DOM and automatically cleans up delete/duplicate event listeners when block is removed

### API Calls

- **`setShippingAddress`**: Updates the shipping address for a quote
  - With existing address: `{ quoteUid, addressId }`
  - With new address: `{ quoteUid, addressData: { ...addressInput, additionalInput: { vat_id } } }`
  - Returns a promise that resolves when address is updated
  - Used in both address selection and new address creation flows
