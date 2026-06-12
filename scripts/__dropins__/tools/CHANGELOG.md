# @adobe-commerce/elsie

## 1.9.0

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`, `build-tools`) do not declare an `engines` field as they do not run in Node.js.

- 62adf1c: Reduce HTTP requests on page load through three bundling optimizations. The preact runtime is isolated in its own vendor chunk so it no longer co-locates into other chunks. Dropin API and internal component modules are consolidated into `chunks/api.js` and `chunks/components.js` respectively, replacing the previous pattern of one chunk file per function or component. All SVG icons are consolidated into a single `chunks/icons.js` chunk instead of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request footprint. No source changes are required.

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled into `chunks/api.js`. The `manualChunks` function now walks the full importer graph (with cycle protection) to determine whether an api-directory module is owned by the fragments barrel, so fragment files stay in the fragments output chunk even when accessed through intermediate sub-barrels.
- 5c64620: Implement a new `fragment-import-redirect` build plugin that automatically detects and redirects any dropin source file that directly imports a fragment source file (bypassing the barrel). The import is silently redirected to the fragments barrel at build time and a warning is emitted identifying the file so it can be corrected in source. This ensures fragment constants always appear as local declarations in `fragments.js` regardless of how dropin source code references them.

## 1.9.0-beta.3

### Patch Changes

- 5c64620: Implement a new `fragment-import-redirect` build plugin that automatically detects and redirects any dropin source file that directly imports a fragment source file (bypassing the barrel). The import is silently redirected to the fragments barrel at build time and a warning is emitted identifying the file so it can be corrected in source. This ensures fragment constants always appear as local declarations in `fragments.js` regardless of how dropin source code references them.

## 1.9.0-beta.2

### Patch Changes

- d2aacc7: Fix: GraphQL fragment source files are no longer incorrectly bundled into `chunks/api.js`. The `manualChunks` function now walks the full importer graph (with cycle protection) to determine whether an api-directory module is owned by the fragments barrel, so fragment files stay in the fragments output chunk even when accessed through intermediate sub-barrels. Boilerplate GraphQL overrides work correctly in all dropin barrel structures.

## 1.9.0-beta.1

### Minor Changes

- af62897: Update minimum Node.js requirement to 22 LTS

  Packages are now built with Node.js 22. `elsie` requires `>=22`; browser-only packages (`fetch-graphql`, `event-bus`, `recaptcha`, `storefront-design`, `build-tools`) do not declare an `engines` field as they do not run in Node.js.

## 1.9.0-beta.0

### Minor Changes

- 62adf1c: Reduce HTTP requests on page load through three bundling optimizations. The preact runtime is isolated in its own vendor chunk so it no longer co-locates into other chunks. Dropin API and internal component modules are consolidated into `chunks/api.js` and `chunks/components.js` respectively, replacing the previous pattern of one chunk file per function or component. All SVG icons are consolidated into a single `chunks/icons.js` chunk instead of one chunk per icon.

  Drop-ins must be rebuilt against this release to get the reduced request footprint. No source changes are required.

## 1.8.1

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can provide layout-aware sizing hints for more accurate srcset image source selection.

## 1.8.1-beta.0

### Patch Changes

- e44f618: Fixed `srcset w` descriptors to use actual image widths instead of viewport breakpoints, preventing blurry product images.
- 46d57ca: Add optional `sizes` prop to the `Image` component so dropins can provide layout-aware sizing hints for more accurate srcset image source selection.

## 1.8.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a package.json file and include both the LICENSE and CHANGELOG files in the dist directory.

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.1

### Patch Changes

- 7792c59: Fix vite.mjs path for LICENSE.md

## 1.8.0-beta.0

### Minor Changes

- c4da094: Enhance the Vite build process to automatically generate a package.json file and include both the LICENSE and CHANGELOG files in the dist directory.
