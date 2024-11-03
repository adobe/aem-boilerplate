"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformStoreConfig = void 0;
function transformStoreConfig(data) {
    if (!data)
        return null;
    return {
        orderCancellationEnabled: data.order_cancellation_enabled,
        orderCancellationReasons: data.order_cancellation_reasons,
        shoppingCartDisplayPrice: data.shopping_cart_display_price,
        shoppingOrdersDisplaySubtotal: data.shopping_cart_display_subtotal,
        shoppingOrdersDisplayShipping: data.shopping_cart_display_shipping,
        shoppingOrdersDisplayGrandTotal: data.shopping_cart_display_grand_total,
        shoppingOrdersDisplayTaxGiftWrapping: data.shopping_cart_display_tax_gift_wrapping,
        shoppingOrdersDisplayFullSummary: data.shopping_cart_display_full_summary,
        shoppingOrdersDisplayZeroTax: data.shopping_cart_display_zero_tax,
    };
}
exports.transformStoreConfig = transformStoreConfig;
