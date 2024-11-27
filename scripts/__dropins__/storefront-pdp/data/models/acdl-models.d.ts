/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
/**
 * ACDL Product Types from:
 * https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/product.ts
 */
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
    productType?: ProductType;
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
export declare enum ProductType {
    ComplexProduct = "complex",
    SimpleProduct = "simple"
}
export declare enum ProductViewType {
    ComplexProductView = "ComplexProductView",
    SimpleProductView = "SimpleProductView"
}
//# sourceMappingURL=acdl-models.d.ts.map