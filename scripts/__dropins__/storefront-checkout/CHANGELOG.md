# @dropins/storefront-checkout

## 3.3.0

### Minor Changes

- 551ddae: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- a1517e1: Add `checkout/layout` extension hook to allow customizing the checkout page structure (reorder, hide, move, group, or inject sections) without modifying the base block code. Includes a `custom-layout` example extension.
- 90e7dcc: Bump @adobe-commerce/elsie to v1.9.0-beta.3
- ab1424a: Bump to StorefrontSDK stable version
- 15c9fdc: Replace deprecated grid gap properties in checkout block CSS
- b946af8: Fix custom vite config compatibility with elsie

## 3.3.0-beta.3

### Patch Changes

- ab1424a: Bump to StorefrontSDK stable version

## 3.3.0-beta.2

### Patch Changes

- b946af8: Fix custom vite config compatibility with elsie

## 3.3.0-beta.1

### Patch Changes

- 90e7dcc: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 3.3.0-beta.0

### Minor Changes

- 551ddae: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- a1517e1: Add `checkout/layout` extension hook to allow customizing the checkout page structure (reorder, hide, move, group, or inject sections) without modifying the base block code. Includes a `custom-layout` example extension.
- 15c9fdc: Replace deprecated grid gap properties in checkout block CSS

## 3.2.1

### Patch Changes

- 5c0df16: Pass `additionalData` to `setPaymentMethodOnCart` to support Payment Services vault and other methods requiring extra mutation fields.

## 3.2.1-beta.0

### Patch Changes

- 5c0df16: Pass `additionalData` to `setPaymentMethodOnCart` to support Payment Services vault and other methods requiring extra mutation fields.

## 3.2.0

### Minor Changes

- 4796173: Added a new ShippingMethodItem slot to the ShippingMethods container that allows merchants to fully replace the default shipping method UI. The slot context provides the method data, selection state, and an onSelect callback to trigger the API call, enabling complete control over the shipping method appearance via ctx.replaceWith().
- f1a2904: Add GraphQL extensibility to the `estimateShippingMethods` mutation via the new `EstimateShippingModel` model and the new`ESTIMATE_SHIPPING_METHOD_FRAGMENT` fragment.

### Patch Changes

- 3cf1727: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 0cb9bf0: fix: temporary fix to pass cypress tests...USPS shipping method was deprecated on January
- 0b7fe40: Update checkout/shipping-methods-render hook to include render function in context.
- 6c31c8d: Added checkout/shipping-methods-render hook and custom-shipping-methods extension sample.
- 6b892f1: Use SDK extension manager in commerce-checkout-with-extensions block.
- 9c782c9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 3.2.0-beta.2

### Patch Changes

- 0cb9bf0: fix: temporary fix to pass cypress tests...USPS shipping method was deprecated on January

## 3.2.0-beta.1

### Patch Changes

- 9c782c9: Bump `@adobe-commerce/elsie` from 1.7.0 to 1.8.0

## 3.2.0-beta.0

### Minor Changes

- 4796173: Added a new ShippingMethodItem slot to the ShippingMethods container that allows merchants to fully replace the default shipping method UI. The slot context provides the method data, selection state, and an onSelect callback to trigger the API call, enabling complete control over the shipping method appearance via ctx.replaceWith().
- f1a2904: Add GraphQL extensibility to the `estimateShippingMethods` mutation via the new `EstimateShippingModel` model and the new`ESTIMATE_SHIPPING_METHOD_FRAGMENT` fragment.

### Patch Changes

- 3cf1727: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- 0b7fe40: Update checkout/shipping-methods-render hook to include render function in context.
- 6c31c8d: Added checkout/shipping-methods-render hook and custom-shipping-methods extension sample.
- 6b892f1: Use SDK extension manager in commerce-checkout-with-extensions block.
