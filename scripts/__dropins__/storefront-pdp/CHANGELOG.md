# @dropins/storefront-pdp

## 3.2.0

### Minor Changes

- 763e5f9: Use the correct control when multi is true vs false so bundle options work without storefront customization.

  - **multi === false:** Keep the existing single-select dropdown (`Picker`) for dropdown-type options; swatches unchanged for text/image/color.
  - **multi === true:** Render Elsie `Checkbox` per option value (no radio or multi-select dropdown OOTB).
  - **Swatches:** Selection state is either `{ label, value }` (single) or `{ label, values[] }` (multi); validation and labels updated accordingly.
  - **Data / API:** `selectionMapToOptionUIDs` flattens selections and, when given `data.options`, orders UIDs by option groups; bundle completion uses “every required group has ≥1 child UID,” not `uids.length === option count`.
  - **Containers:** `ProductOptions`, `ProductDetails`, and `initialize` use the shared helpers for payloads, validity, and placeholder filtering.
  - **`getOptionUIDs` (bundles):** Prefer client `optionUIDs` when present; support multiple defaults when `multi` is true.
  - **Tests:** Checkbox coverage for `multiple`, lib unit tests, and `ProductDetails` expectation aligned with stable UID order.

- 5c5be95: Add jest-preset-preact to devDependencies to fix test execution under Yarn Berry
- f59e497: Bump @adobe-commerce/elsie to 1.9.0-beta.0 and upgrade CI workflows to storefront-workflows v6 (Node 24)

### Patch Changes

- a48fbe2: Bump @adobe-commerce/elsie from ~1.5.0 to ~1.8.1 to reduce HTTP request count via SDK bundle optimizations
- 1889117: Bump StorefrontSDK dependencies to their stable releases: `@adobe-commerce/elsie` to ~1.9.0, `@adobe-commerce/event-bus` to ~1.1.0, `@adobe-commerce/fetch-graphql` to ~1.3.0, `@adobe-commerce/recaptcha` to ~1.2.0, and `@adobe-commerce/storefront-design` to ~1.1.0. The elsie 1.9.0 build tooling reduces the drop-in's HTTP request count via SDK bundle optimizations.
- ceaba76: Bump @adobe-commerce/elsie to 1.9.0-beta.1, which lowers the minimum Node.js requirement back to 22 LTS. Relax `engines.node` to `>=22` and align `.nvmrc` to 22.12.0.
- b58d460: Bump @adobe-commerce/elsie to 1.9.0-beta.3, which includes the SDK fix for generating `api.js` and `fragments.js` during the build process.
- dc086a9: Resolve axios and flatted CVEs via yarn resolutions

## 3.2.0-beta.4

### Patch Changes

- 1889117: Bump StorefrontSDK dependencies to their stable releases: `@adobe-commerce/elsie` to ~1.9.0, `@adobe-commerce/event-bus` to ~1.1.0, `@adobe-commerce/fetch-graphql` to ~1.3.0, `@adobe-commerce/recaptcha` to ~1.2.0, and `@adobe-commerce/storefront-design` to ~1.1.0. The elsie 1.9.0 build tooling reduces the drop-in's HTTP request count via SDK bundle optimizations.

## 3.2.0-beta.3

### Patch Changes

- b58d460: Bump @adobe-commerce/elsie to 1.9.0-beta.3, which includes the SDK fix for generating `api.js` and `fragments.js` during the build process.

## 3.2.0-beta.2

### Patch Changes

- ceaba76: Bump @adobe-commerce/elsie to 1.9.0-beta.1, which lowers the minimum Node.js requirement back to 22 LTS. Relax `engines.node` to `>=22` and align `.nvmrc` to 22.12.0.

## 3.2.0-beta.1

### Minor Changes

- 763e5f9: Use the correct control when multi is true vs false so bundle options work without storefront customization.

  - **multi === false:** Keep the existing single-select dropdown (`Picker`) for dropdown-type options; swatches unchanged for text/image/color.
  - **multi === true:** Render Elsie `Checkbox` per option value (no radio or multi-select dropdown OOTB).
  - **Swatches:** Selection state is either `{ label, value }` (single) or `{ label, values[] }` (multi); validation and labels updated accordingly.
  - **Data / API:** `selectionMapToOptionUIDs` flattens selections and, when given `data.options`, orders UIDs by option groups; bundle completion uses “every required group has ≥1 child UID,” not `uids.length === option count`.
  - **Containers:** `ProductOptions`, `ProductDetails`, and `initialize` use the shared helpers for payloads, validity, and placeholder filtering.
  - **`getOptionUIDs` (bundles):** Prefer client `optionUIDs` when present; support multiple defaults when `multi` is true.
  - **Tests:** Checkbox coverage for `multiple`, lib unit tests, and `ProductDetails` expectation aligned with stable UID order.

- f59e497: Bump @adobe-commerce/elsie to 1.9.0-beta.0 and upgrade CI workflows to storefront-workflows v6 (Node 24)

## 3.1.0

### Minor Changes

- 5c5be95: Add jest-preset-preact to devDependencies to fix test execution under Yarn Berry

### Patch Changes

- dc086a9: Resolve axios and flatted CVEs via yarn resolutions
