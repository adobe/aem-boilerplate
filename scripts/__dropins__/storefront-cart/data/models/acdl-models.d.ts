/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
 * ACDL Shopping Cart Types copied over from:
 *  https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/shoppingCart.ts
 */
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
};
export type ChangedProductsContext = {
    items?: ShoppingCartItem[];
};
export type Price = {
    value: number;
    currency?: string;
    regularPrice?: number;
};
export type Product = {
    productId: number;
    name: string;
    sku: string;
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
export type ShoppingCartItem = {
    canApplyMsrp: boolean;
    formattedPrice: string;
    id: string;
    prices: {
        price: Price;
    };
    product: Product;
    configurableOptions?: Array<ConfigurableOption>;
    quantity: number;
};
export type ConfigurableOption = {
    id: number;
    optionLabel: string;
    valueId: number;
    valueLabel: string;
};
//# sourceMappingURL=acdl-models.d.ts.map