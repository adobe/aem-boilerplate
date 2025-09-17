# Product Recommendations Block

## Overview

The Product Recommendations block provides personalized product recommendations using the @dropins/storefront-recommendations ProductList container. It handles recommendation loading with intersection observer, context tracking, and dynamic reloading based on user behavior and page changes.

## Integration

### Block Configuration

| Configuration Key | Type | Default | Description | Required | Side Effects |
|-------------------|------|---------|-------------|----------|--------------|
| `currentsku` | string | undefined | Current product SKU for recommendation context | No | Sets the current product context for recommendations |
| `recid` | string | undefined | Recommendation ID for targeting specific recommendation types | No | Identifies which recommendation algorithm to use |

<!-- ### URL Parameters

No URL parameters directly affect this block's behavior. -->

### Local Storage

- `{storeViewCode}:productViewHistory` - Stores user's product view history for recommendation context
- `{storeViewCode}:purchaseHistory` - Stores user's purchase history for recommendation context

### Events

#### Event Listeners

- `events.on('recommendations/data', callback)` - Listens for recommendation data updates with eager loading
- Adobe Data Layer event listeners for page context, product context, category context, and shopping cart context changes

#### Event Emitters

- `publishRecsItemAddToCartClick()` - Emits recommendation analytics events when items are added to cart

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
