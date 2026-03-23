# @dropins/storefront-company-switcher

## 1.1.1

### Patch Changes

- 0499d70: Bump "@adobe-commerce/elsie" from 1.8.0-beta0 to 1.8.0-beta1
- 1de9f29: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- d9d1c6a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0
- 7343c2e: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- d2368e4: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.1.1-beta.3

### Patch Changes

- d2368e4: Bump adobe-commerce/elsie from 1.8.0-beta.1 to 1.8.0

## 1.1.1-beta.2

### Patch Changes

- 0499d70: Bump "@adobe-commerce/elsie" from 1.8.0-beta0 to 1.8.0-beta1

## 1.1.1-beta.1

### Patch Changes

- d9d1c6a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.0

### Patch Changes

- 1de9f29: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 7343c2e: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.
