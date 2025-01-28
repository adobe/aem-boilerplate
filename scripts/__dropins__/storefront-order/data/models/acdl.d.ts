/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
/**
 * This module contains the schema type definitions to build the ShoppingCart
 * and Order contexts, which are required to trigger the "place-order" event.
 *
 * The following schema types have been extracted from the Adobe Commerce
 * Events SDK package.
 *
 * ShoppingCart schema type @see https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/shoppingCart.ts
 * Order schema type @see https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/order.ts
 */
type ShoppingCartItem = {
    canApplyMsrp: boolean;
    formattedPrice: string;
    id: string;
    prices: {
        price: Price;
    };
    product: Product;
    configurableOptions?: Array<ConfigurableOption>;
    quantity: number;
    discountAmount?: number;
};
type Price = {
    value: number;
    currency?: string;
    regularPrice?: number;
};
type Product = {
    productId: number;
    name: string;
    sku: string;
    /**
     * For simple, downloadable, and virtual products with no configurable options topLevelSku is the same
     * as the product SKU.
     * For grouped, bundled, and configurable products topLevelSku is the parent product SKU of the associated item.
     */
    topLevelSku?: string | null;
    specialToDate?: string | null;
    specialFromDate?: string | null;
    newToDate?: string | null;
    newFromDate?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    manufacturer?: string | null;
    countryOfManufacture?: string | null;
    categories?: string[] | null;
    productType?: string | null;
    pricing?: {
        regularPrice: number;
        minimalPrice?: number;
        maximalPrice?: number;
        specialPrice?: number;
        tierPricing?: {
            customerGroupId?: number | null;
            qty: number;
            value: number;
        }[];
        currencyCode: string | null;
    };
    canonicalUrl?: string | null;
    mainImageUrl?: string | null;
};
type ConfigurableOption = {
    id: number;
    optionLabel: string;
    valueId: number;
    valueLabel: string;
};
type Payment = {
    paymentMethodCode: string;
    paymentMethodName: string;
    total: number;
    orderId?: string;
};
type Shipping = {
    shippingMethod?: string;
    shippingAmount?: number;
};
export type ShoppingCartContext = {
    id: string | null;
    items?: Array<ShoppingCartItem>;
    prices?: {
        subtotalExcludingTax?: Price;
        subtotalIncludingTax?: Price;
    };
    totalQuantity: number;
    possibleOnepageCheckout?: boolean;
    giftMessageSelected?: boolean;
    giftWrappingSelected?: boolean;
    source?: string;
    discountAmount?: number;
};
export type OrderContext = {
    appliedCouponCode: string;
    email: string;
    grandTotal: number;
    orderId: string;
    orderType?: 'checkout' | 'instant_purchase';
    otherTax: number;
    payments?: Payment[];
    salesTax: number;
    shipping?: Shipping;
    subtotalExcludingTax: number;
    subtotalIncludingTax: number;
    discountAmount?: number;
    taxAmount?: number;
};
export {};
//# sourceMappingURL=acdl.d.ts.map