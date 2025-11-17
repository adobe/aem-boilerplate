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
interface Product {
    sku: string;
    parent_sku: string;
    name: string;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    addToCartAllowed: boolean;
    url: string;
    urlKey: string;
    externalId: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
}
interface ConfigurableOption {
    option_uid: string;
    option_label: string;
    value_uid: string;
    value_label: string;
}
interface ConfiguredProduct {
    name: string;
    sku?: string;
    images?: [{
        url: string;
    }];
    price: {
        final: {
            amount: {
                value: number;
                currency: string;
            };
        };
    };
}
interface BundleOption {
    uid: string;
    label: string;
    type: string;
    values: {
        uid: string;
        label: string;
        original_price: {
            value: number;
            currency: string;
        };
        priceV2: {
            value: number;
            currency: string;
        };
        quantity: number;
    }[];
}
interface CustomizableOption {
    uid: string;
    is_required: boolean;
    label: string;
    sort_order: number;
    type: string;
    values: {
        uid: string;
        label: string;
        price: {
            type: string;
            units: string;
            value: number;
        };
        value: string;
    }[];
}
interface Link {
    uid: string;
    price?: number;
    sample_url?: string;
    sort_order?: number;
    title?: string;
}
interface GiftCardOption {
    amount?: {
        value?: number;
        currency?: string;
    };
    custom_giftcard_amount?: {
        value?: number;
        currency?: string;
    };
    message?: string;
    recipient_email?: string;
    recipient_name?: string;
    sender_name?: string;
    sender_email?: string;
}
interface Sample {
    url?: string;
    sort_order?: number;
    title?: string;
}
interface Item {
    uid: string;
    sku: string;
    product: Product;
    quantity: number;
    customizable_options?: CustomizableOption[];
    bundle_options?: BundleOption[];
    configurable_options?: ConfigurableOption[];
    configured_product?: ConfiguredProduct;
    links?: Link[];
    samples?: Sample[];
    gift_card_options?: GiftCardOption;
}
export { Product, ConfigurableOption, ConfiguredProduct, BundleOption, CustomizableOption, Link, GiftCardOption, Sample, Item, };
//# sourceMappingURL=item.d.ts.map