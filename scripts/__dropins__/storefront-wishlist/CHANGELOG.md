# @dropins/storefront-wishlist

## 3.3.0

### Minor Changes

- ebcbb7e: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- ebcbb7e: Replaced PaaS & SaaS instances and some products to fix Cypress tests
- 5f367fe: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- 30a28da: Bump commerce packages

## 3.3.0-beta.1

### Patch Changes

- 5f367fe: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- ebcbb7e: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- ebcbb7e: Replaced PaaS & SaaS instances and some products to fix Cypress tests

## 3.2.0

### Minor Changes

- 8728c8d: - Add multistore support to the wishlist dropin by scoping localStorage/sessionStorage keys and wishlist ID cookies per store view code
  - Accept an optional `storeCode` config prop during initialization, which is read from the AEM config system (`Magento-Store-View-Code header`) and stored on internal state
  - When `storeCode` is present and not `'default'`, storage keys become `DROPIN__WISHLIST__WISHLIST__DATA__<storeCode>` and cookies become `DROPIN__WISHLIST__WISHLIST-ID__<storeCode>`, isolating guest and authenticated wishlist data between stores
  - Single-store setups and the `'default'` store continue using the original unscoped keys for backward compatibility

### Patch Changes

- 510af65: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1
- ac6097d: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0
- e6ae79a: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- a521911: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 3.2.0-beta.3

### Patch Changes

- ac6097d: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 510af65: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0-beta.1

## 3.2.0-beta.1

### Patch Changes

- a521911: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

## 3.2.0-beta.0

### Minor Changes

- 8728c8d: - Add multistore support to the wishlist dropin by scoping localStorage/sessionStorage keys and wishlist ID cookies per store view code
  - Accept an optional `storeCode` config prop during initialization, which is read from the AEM config system (`Magento-Store-View-Code header`) and stored on internal state
  - When `storeCode` is present and not `'default'`, storage keys become `DROPIN__WISHLIST__WISHLIST__DATA__<storeCode>` and cookies become `DROPIN__WISHLIST__WISHLIST-ID__<storeCode>`, isolating guest and authenticated wishlist data between stores
  - Single-store setups and the `'default'` store continue using the original unscoped keys for backward compatibility

### Patch Changes

- e6ae79a: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
