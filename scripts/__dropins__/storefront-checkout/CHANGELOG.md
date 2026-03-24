# @dropins/storefront-checkout

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
