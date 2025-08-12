/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
 * Product data model is based on PDP. For further details see:
 *
 * https://github.com/adobe-commerce/storefront-pdp/blob/develop/src/data/models/product-model.ts
 * https://github.com/adobe-commerce/storefront-pdp/blob/develop/src/data/models/acdl-models.ts
 */
export interface Product {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean | null;
    shortDescription?: string;
    metaDescription?: string;
    metaKeyword?: string;
    metaTitle?: string;
    description?: string;
    images?: Image[];
    prices: Prices;
    attributes?: Attribute[];
    options?: Option[];
    optionUIDs?: string[];
    url?: string;
    urlKey?: string;
    externalId?: string;
    externalParentId?: string;
    variantSku?: string;
    productType?: ProductType | undefined;
}
export interface Image {
    url: string;
    label: string;
    width?: number;
    height?: number;
}
interface Price {
    amount?: number;
    currency?: string;
    maximumAmount?: number;
    minimumAmount?: number;
    variant?: 'default' | 'strikethrough';
}
export interface Prices {
    regular: Price;
    final: Price;
    visible: boolean;
}
export interface Option {
    id: string;
    type: 'text' | 'image' | 'color' | 'dropdown';
    typename: 'ProductViewOptionValueProduct' | 'ProductViewOptionValueSwatch' | 'ProductViewOptionValueConfiguration';
    label: string;
    required: boolean;
    multiple: boolean;
    items: OptionValue[];
}
interface OptionValue {
    id: string;
    label: string;
    inStock: boolean;
    value: string;
    selected: boolean;
    product?: any;
}
interface Attribute {
    label: string;
    value: string;
}
export declare enum ProductType {
    ComplexProduct = "complex",
    SimpleProduct = "simple"
}
export {};
//# sourceMappingURL=product.d.ts.map