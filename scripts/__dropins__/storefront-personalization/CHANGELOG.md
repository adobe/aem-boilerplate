# @dropins/storefront-personalization

## 3.1.1

### Patch Changes

- a715ac9: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- d14bba9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0
- cf26cbd: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.

## 3.1.1-beta.1

### Patch Changes

- d14bba9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 3.1.1-beta.0

### Patch Changes

- a715ac9: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- cf26cbd: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
