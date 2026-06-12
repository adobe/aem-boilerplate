# @dropins/storefront-order

## 4.0.0

### Major Changes

- 6a3e582: Add support for Seller Assisted Buying feature that allows store administrators to place orders on behalf of customers. Orders placed by administrators are marked with a visible "Order placed by an administrator" label on the order details page. The feature also integrates with order comments to track admin actions and provide a history of administrative assistance throughout the order lifecycle.

### Minor Changes

- d09caca: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- 1714bd1:
- 97eb21b: Bump storefront SDK stable version
- ab3d4d6: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.3

### Patch Changes

- 97eb21b: Bump storefront SDK stable version

## 4.0.0-beta.2

### Patch Changes

- ab3d4d6: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.1

### Patch Changes

- 1714bd1:

## 4.0.0-beta.0

### Major Changes

- 6a3e582: Add support for Seller Assisted Buying feature that allows store administrators to place orders on behalf of customers. Orders placed by administrators are marked with a visible "Order placed by an administrator" label on the order details page. The feature also integrates with order comments to track admin actions and provide a history of administrative assistance throughout the order lifecycle.

### Minor Changes

- d09caca: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 3.3.0

### Minor Changes

- 233a773: Add comments field for authenticated users
- 2d34f43: This branch adds order-level comments from the GraphQL CustomerOrder.comments field and a new OrderComments UI (component + container).

## 3.3.0-beta.0

### Minor Changes

- 233a773: Add comments field for authenticated users
- 2d34f43: This branch adds order-level comments from the GraphQL CustomerOrder.comments field and a new OrderComments UI (component + container).

## 3.2.0

### Minor Changes

- b4b4251: Enable GraphQL fragment extension for the CustomerOrder type by exporting GUEST_ORDER_FRAGMENT, allowing merchants to extend order queries with custom fields via overrideGQLOperations.

### Patch Changes

- 12facdd: Internal sync: backmerge main into develop.
- 5284e7f: Fix order cancellation flow by creating separate CUSTOMER_ORDER_FRAGMENT without token field. This prevents authenticated orders from incorrectly using the guest cancellation flow while maintaining backward compatibility for fragment extensions.
- cf344b1: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 6554de1: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- 2a57159: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.3

### Patch Changes

- 2a57159: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 6554de1: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- 5284e7f: Fix order cancellation flow by creating separate CUSTOMER_ORDER_FRAGMENT without token field. This prevents authenticated orders from incorrectly using the guest cancellation flow while maintaining backward compatibility for fragment extensions.

## 3.2.0-beta.0

### Minor Changes

- b4b4251: Enable GraphQL fragment extension for the CustomerOrder type by exporting GUEST_ORDER_FRAGMENT, allowing merchants to extend order queries with custom fields via overrideGQLOperations.

### Patch Changes

- 12facdd: Internal sync: backmerge main into develop.
- cf344b1: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
