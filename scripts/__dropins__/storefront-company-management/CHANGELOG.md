# @dropins/storefront-company-management

## 1.2.0

### Minor Changes

- f1a97ea: fix: Adapted the initializer to be used as the same way than the other drop-ins

### Patch Changes

- a158c8b: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- 8fa4950: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0
- d04bbf6: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.

## 1.2.0-beta.1

### Patch Changes

- 8fa4950: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.2.0-beta.0

### Minor Changes

- f1a97ea: fix: Adapted the initializer to be used as the same way than the other drop-ins

### Patch Changes

- a158c8b: fix: merge user-provided langDefinitions in Provider

  The Provider now imports `config` and uses `deepmerge` to merge user-provided `langDefinitions` with the drop-in's bundled defaults before passing them to `UIProvider`. This enables label/placeholder overrides via the initializer API.

- d04bbf6: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
