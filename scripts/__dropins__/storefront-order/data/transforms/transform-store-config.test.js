"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_store_config_1 = require("./transform-store-config");
describe('data/transforms/transform-store-config', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('null', () => {
        const transformedStoreConfig = (0, transform_store_config_1.transformStoreConfig)(null);
        expect(transformedStoreConfig).toBeNull();
    });
    test('transformStoreConfig', () => {
        const data = {
            order_cancellation_enabled: true,
            shopping_cart_display_price: true,
            order_cancellation_reasons: [
                {
                    description: 'Too small',
                },
                {
                    description: "Didn't like",
                },
            ],
            shopping_cart_display_shipping: 1,
            shopping_cart_display_subtotal: 1,
            shopping_cart_display_grand_total: true,
            shopping_cart_display_tax_gift_wrapping: 'TAX',
            shopping_cart_display_full_summary: true,
            shopping_cart_display_zero_tax: true,
        };
        const transformedStoreConfig = (0, transform_store_config_1.transformStoreConfig)(data);
        expect(transformedStoreConfig).toEqual({
            orderCancellationEnabled: true,
            orderCancellationReasons: [
                {
                    description: 'Too small',
                },
                {
                    description: "Didn't like",
                },
            ],
            shoppingCartDisplayPrice: true,
            shoppingOrdersDisplayFullSummary: true,
            shoppingOrdersDisplayGrandTotal: true,
            shoppingOrdersDisplayShipping: 1,
            shoppingOrdersDisplaySubtotal: 1,
            shoppingOrdersDisplayTaxGiftWrapping: 'TAX',
            shoppingOrdersDisplayZeroTax: true,
        });
    });
});
