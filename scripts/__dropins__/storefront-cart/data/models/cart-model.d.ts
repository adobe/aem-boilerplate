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
export interface CartModel {
    totalGiftOptions: {
        giftWrappingForItems: Price;
        giftWrappingForItemsInclTax: Price;
        giftWrappingForOrder: Price;
        giftWrappingForOrderInclTax: Price;
        printedCard: Price;
        printedCardInclTax: Price;
    };
    cartGiftWrapping: {
        uid: string;
        design: string;
        selected: boolean;
        image: WrappingImage;
        price: Price;
    }[];
    giftReceiptIncluded: boolean;
    printedCardIncluded: boolean;
    giftMessage: {
        recipientName: string;
        senderName: string;
        message: string;
    };
    appliedGiftCards: AppliedGiftCardProps[];
    id: string;
    totalQuantity: number;
    totalUniqueItems: number;
    errors?: ItemError[];
    items: Item[];
    miniCartMaxItems: Item[];
    total: {
        includingTax: Price;
        excludingTax: Price;
    };
    discount?: Price;
    subtotal: {
        excludingTax: Price;
        includingTax: Price;
        includingDiscountOnly: Price;
    };
    appliedTaxes: TotalPriceModifier[];
    totalTax?: Price;
    appliedDiscounts: TotalPriceModifier[];
    shipping?: Price;
    isVirtual?: boolean;
    addresses: {
        shipping?: {
            countryCode: string;
            zipCode?: string;
            regionCode?: string;
        }[];
    };
    isGuestCart?: boolean;
    hasOutOfStockItems?: boolean;
    hasFullyOutOfStockItems?: boolean;
    appliedCoupons?: Coupon[];
}
export interface AppliedGiftCardProps {
    code: string;
    appliedBalance: Price;
    currentBalance: Price;
    giftCardBalance: Price;
    expirationDate: string;
}
interface TotalPriceModifier {
    amount: Price;
    label: string;
    coupon?: Coupon;
}
interface FixedProductTax {
    amount: Price;
    label: string;
}
export interface Item {
    giftWrappingAvailable: boolean;
    giftWrappingPrice: {
        currency: string;
        value: number;
    };
    productGiftWrapping: {
        uid: string;
        design: string;
        selected: boolean;
        image: WrappingImage;
        price: Price;
    }[];
    giftMessage: {
        recipientName: string;
        senderName: string;
        message: string;
    };
    priceTiers: PriceTier[];
    giftMessageAvailable: boolean | null;
    taxedPrice: Price;
    rowTotal: Price;
    rowTotalIncludingTax: Price;
    itemType: string;
    uid: string;
    url: ItemURL;
    canonicalUrl: string;
    categories: string[];
    quantity: number;
    sku: string;
    topLevelSku: string;
    name: string;
    image: ItemImage;
    links?: ItemLinks;
    price: Price;
    total: Price;
    discountedTotal?: Price;
    discount?: Price;
    regularPrice: Price;
    discounted: boolean;
    bundleOptions?: {
        [key: string]: any;
    };
    bundleOptionsUIDs?: string[];
    selectedOptions?: {
        [key: string]: any;
    };
    selectedOptionsUIDs?: {
        [key: string]: any;
    };
    customizableOptions?: {
        [key: string]: any;
    };
    message?: string;
    recipient?: string;
    recipientEmail?: string;
    sender?: string;
    senderEmail?: string;
    lowInventory?: boolean;
    insufficientQuantity?: boolean;
    onlyXLeftInStock?: number | null;
    outOfStock?: boolean;
    notAvailableMessage?: string;
    stockLevel?: String;
    discountPercentage?: number;
    savingsAmount?: Price;
    productAttributes?: Attribute[];
    fixedProductTaxes?: FixedProductTax[];
}
interface PriceTier {
    quantity: number;
    final_price: Price;
    discount: {
        amount_off: number;
        percent_off: number;
    };
}
interface ItemError {
    id: string;
    text: string;
}
interface ItemImage {
    src: string;
    alt: string;
}
export interface Price {
    value: number;
    currency: string;
}
interface ItemURL {
    urlKey: string;
    categories: string[];
}
interface ItemLinks {
    count: number;
    result: string;
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
interface Coupon {
    code: string;
}
export interface WrappingImage {
    url: string;
    design: string;
}
export {};
//# sourceMappingURL=cart-model.d.ts.map