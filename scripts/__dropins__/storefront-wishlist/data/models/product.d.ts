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
export interface Product {
    type: string;
    name: string;
    sku: string;
    uid: string;
    image: Image;
    stockStatus?: string;
    canonicalUrl?: string;
    urlKey: string;
    categories: string[];
    prices: PriceDetails;
    productAttributes?: Attribute[];
    options: Option[];
}
export interface PriceDetails {
    regularPrice: MoneyProps;
    finalPrice: MoneyProps;
    discount?: {
        amountOff: number;
        percentOff: number;
    };
    fixedProductTaxes: FixedProductTaxesProps[];
}
export interface MoneyProps {
    value: number;
    currency: string;
}
interface FixedProductTaxesProps {
    money: MoneyProps;
    label: string;
}
interface Image {
    alt: string;
    src: string;
}
interface AttributeOption {
    value: string;
    label: string;
}
interface Attribute {
    code: string;
    value?: string;
    selected_options?: AttributeOption[];
}
interface Option {
    uid: string;
    attributeCode?: string;
    attributeUid?: string;
    required: boolean;
    values: [{
        uid: string;
    }];
}
export {};
//# sourceMappingURL=product.d.ts.map