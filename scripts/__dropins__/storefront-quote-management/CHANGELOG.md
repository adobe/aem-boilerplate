# @dropins/storefront-quote-management

## 1.1.2

### Patch Changes

- 0dd15e3: Make package public

## 1.1.1

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.1

### Patch Changes

- 214719a: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 1.1.1-beta.0

### Patch Changes

- 2ee05ac: fix: merge user-provided langDefinitions in Provider

  The Provider now imports config and uses deepmerge to merge user-provided langDefinitions with the drop-in's bundled defaults before passing them to UIProvider. This enables label/placeholder overrides via the initializer API.

- c1aa431: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
