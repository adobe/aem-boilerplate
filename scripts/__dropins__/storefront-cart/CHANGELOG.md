# @dropins/storefront-cart

## 3.3.0

### Minor Changes

- 9974a25: Added `confirmBeforeDelete` prop to `CartSummaryList` and `MiniCart`. When enabled, clicking the remove button shows an inline confirmation banner before the item is deleted, rather than removing it immediately. A custom `ConfirmDeleteBanner` slot is available on both containers for full rendering control.

  Extended `enableUpdateItemQuantity` on `CartSummaryList` and `enableQuantityUpdate` on `MiniCart` to accept `boolean | { removeOnZero?: boolean }`. When `removeOnZero` is not explicitly set to `true`, setting the quantity to `0` via the input is a no-op — the item is not removed. Explicit removal actions (trash button, confirm-delete, out-of-stock removal) are unaffected.

- d4b49bb: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- bbb8b80: Bump to StorefrontSDK stable version
- b9c309e: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- 855a803: Fixed bug due to a case-sensitive SKU comparison in addProductsToCart() that caused items to be silently excluded from ACDL data collection events. The sku input (lowercase) was compared against item.topLevelSku (uppercase) using strict equality, so the filter always returned false. Both values are now normalized with .toUpperCase() before comparison.

## 3.3.0-beta.2

### Patch Changes

- bbb8b80: Bump to StorefrontSDK stable version

## 3.3.0-beta.1

### Patch Changes

- b9c309e: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- 9974a25: Added `confirmBeforeDelete` prop to `CartSummaryList` and `MiniCart`. When enabled, clicking the remove button shows an inline confirmation banner before the item is deleted, rather than removing it immediately. A custom `ConfirmDeleteBanner` slot is available on both containers for full rendering control.

  Extended `enableUpdateItemQuantity` on `CartSummaryList` and `enableQuantityUpdate` on `MiniCart` to accept `boolean | { removeOnZero?: boolean }`. When `removeOnZero` is not explicitly set to `true`, setting the quantity to `0` via the input is a no-op — the item is not removed. Explicit removal actions (trash button, confirm-delete, out-of-stock removal) are unaffected.

- d4b49bb: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 855a803: Fixed bug due to a case-sensitive SKU comparison in addProductsToCart() that caused items to be silently excluded from ACDL data collection events. The sku input (lowercase) was compared against item.topLevelSku (uppercase) using strict equality, so the filter always returned false. Both values are now normalized with .toUpperCase() before comparison.

## 3.2.0

### Minor Changes

- 9bccbf3: Add `includeOutOfStockItems` flag to CartSummaryList

### Patch Changes

- 8b1717f: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- 6344765: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 967b99e: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 967b99e: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 8b1717f: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Minor Changes

- 9bccbf3: Add `includeOutOfStockItems` flag to CartSummaryList

## 3.1.1-beta.0

### Patch Changes

- 6344765: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
