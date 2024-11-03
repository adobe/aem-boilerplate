"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORE_CONFIG_QUERY = void 0;
exports.STORE_CONFIG_QUERY = `
query STORE_CONFIG_QUERY {
  storeConfig {
    order_cancellation_enabled
    order_cancellation_reasons {
        description
    }
    shopping_cart_display_price
    shopping_cart_display_shipping
    shopping_cart_display_subtotal
    shopping_cart_display_grand_total
    shopping_cart_display_tax_gift_wrapping
    shopping_cart_display_full_summary
    shopping_cart_display_zero_tax
  }
}
`;
