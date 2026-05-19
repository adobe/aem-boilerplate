# Product Recommendations Block

## Overview

The Product Recommendations block provides personalized product recommendations using the @dropins/storefront-recommendations ProductList container. It handles recommendation loading with intersection observer, context tracking, and dynamic reloading based on user behavior and page changes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `currentsku` | string | undefined | Explicit current product SKU. On a PDP this is sourced automatically from ACDL `productContext`; use this field on non-PDP pages only. | No | Overrides ACDL-derived SKU |
| `currentprice` | number | undefined | Explicit current product price (anchor price for filtering). On a PDP price is sourced automatically from ACDL `productContext.pricing` (`specialPrice ?? regularPrice`); use this field on non-PDP pages only. | No | Overrides ACDL-derived price; enables price-based recommendation filtering |
| `recid` | string | undefined | Recommendation unit ID to render | No | Identifies which recommendation unit to fetch |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

### Local Storage

- `{storeViewCode}:productViewHistory` - Stores user's product view history for recommendation context
- `{storeViewCode}:purchaseHistory` - Stores user's purchase history for recommendation context

### Events

#### Event Listeners

- Adobe Data Layer (`adobeDataLayer:change`) for `pageContext`, `productContext`, `categoryContext`, and `shoppingCartContext` — triggers recommendation reload on significant changes
- `productContext` changes also extract `pricing` (SKU + `specialPrice ?? regularPrice`) and pass it to the dropin as the `currentProduct` prop

#### Event Emitters

- `publishRecsItemAddToCartClick()` — emits recommendation analytics events when items are added to cart

## Behavior Patterns

### Page Context Detection

- **Mobile Devices**: Uses intersection observer to load recommendations when section becomes visible
- **Desktop Devices**: Loads recommendations immediately on page load
- **Context Changes**: Reloads recommendations when significant context changes occur (product, category, page type)
- **Cart Changes**: Updates recommendation context when cart contents change

### User Interaction Flows

1. **Initialization**: Block sets up recommendation context and loads initial recommendations
2. **Lazy Loading**: On mobile, recommendations load when section becomes visible
3. **Context Tracking**: Monitors page, product, category, and cart changes to update recommendations
4. **Product Actions**: Users can add products to cart or navigate to product details
5. **Wishlist Integration**: Users can add/remove products from wishlist
6. **Dynamic Reloading**: Recommendations reload when significant context changes occur

### Error Handling

- **Context Errors**: If context data is invalid, falls back to empty arrays for view/purchase history
- **API Errors**: If recommendation API fails, the ProductList container handles error display
- **Configuration Errors**: If `readBlockConfig()` fails, uses undefined values for configuration
- **Image Rendering Errors**: If product images fail to load, the image slots handle fallback behavior
- **Fallback Behavior**: Always falls back to appropriate default values for missing or invalid configuration
