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
export type RenderAPI = {
    remove: () => void;
    setProps: (cb: (prev: any) => any) => void;
};
export type EventSubscription = {
    off: () => void;
} | undefined;
export type FormRef = {
    handleValidationSubmit: (disableShowError: boolean) => boolean;
    isDataValid: boolean;
};
export interface CartModel {
    id: string;
    totalQuantity: number;
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
}
interface TotalPriceModifier {
    amount: Price;
    label: string;
}
export interface Item {
    taxedPrice: Price;
    rowTotal: Price;
    rowTotalIncludingTax: Price;
    itemType: string;
    uid: string;
    url: ItemURL;
    quantity: number;
    sku: string;
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
    selectedOptions?: {
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
    stockLevel?: string;
}
interface ItemError {
    id: string;
    text: string;
}
interface ItemImage {
    src: string;
    alt: string;
}
interface Price {
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
export interface ShippingAddress {
    uid?: string;
    firstname: string;
    lastname: string;
    company?: string;
    street: string[];
    city: string;
    region?: {
        code: string;
        label: string;
        regionId: number;
    };
    postcode: string;
    country: {
        code: string;
        label: string;
    };
    telephone: string;
}
export interface NegotiableQuoteModel {
    uid: string;
    name: string;
    createdAt: string;
    salesRepName: string;
    expirationDate: string;
    updatedAt: string;
    status: NegotiableQuoteStatus;
    buyer: {
        firstname: string;
        lastname: string;
    };
    templateName?: string;
    comments?: {
        uid: string;
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: {
            name: string;
            url: string;
        }[];
    }[];
    history?: NegotiableQuoteHistoryEntry[];
    prices: {
        appliedDiscounts?: Discount[];
        appliedTaxes?: Tax[];
        discount?: Currency;
        grandTotal?: Currency;
        grandTotalExcludingTax?: Currency;
        shippingExcludingTax?: Currency;
        shippingIncludingTax?: Currency;
        subtotalExcludingTax?: Currency;
        subtotalIncludingTax?: Currency;
        subtotalWithDiscountExcludingTax?: Currency;
        totalTax?: Currency;
    };
    items: NegotiableQuoteCartItem[];
    shippingAddresses?: ShippingAddress[];
    canCheckout: boolean;
    canSendForReview: boolean;
}
export interface NegotiableQuoteCartItem {
    product: {
        uid: string;
        sku: string;
        name: string;
        templateId?: string;
        templateName?: string;
        priceRange: {
            maximumPrice: {
                regularPrice: {
                    value: number;
                };
            };
        };
    };
    catalogDiscount: {
        amountOff: number;
        percentOff: number;
    };
    discounts: {
        label: string;
        value: string;
        amount: Currency;
    }[];
    stockStatus: string;
    quantity: number;
    prices: {
        originalItemPrice: Currency;
        rowTotal: Currency;
    };
    configurableOptions?: {
        optionLabel: string;
        valueLabel: string;
    }[];
    bundleOptions?: {
        label: string;
        values: {
            label: string;
            quantity: number;
            originalPrice: Currency;
            price: Currency;
        }[];
    }[];
    noteFromBuyer?: ItemNote[];
    noteFromSeller?: ItemNote[];
}
export interface ItemNote {
    createdAt: string;
    creatorId: number;
    creatorType: number;
    negotiableQuoteItemUid: string;
    note: string;
    noteUid: string;
}
export interface Currency {
    value: number;
    currency: string;
}
export interface Tax {
    amount: Currency;
    label: string;
}
export interface Discount {
    amount: Currency;
    label: string;
    coupon?: Coupon;
}
export interface Coupon {
    code: string;
}
export interface NegotiableQuoteListEntry {
    uid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    status: NegotiableQuoteStatus;
    buyer: {
        firstname: string;
        lastname: string;
    };
    templateName: string;
    prices: {
        grandTotal: Currency;
    };
}
export interface NegotiableQuotesListModel {
    items: NegotiableQuoteListEntry[];
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
    totalCount: number;
    paginationInfo?: PaginationInfo;
    sortFields?: {
        default: string;
        options: Array<{
            label: string;
            value: string;
        }>;
    };
}
export interface NegotiableQuoteHistoryEntry {
    author: {
        firstname: string;
        lastname: string;
    };
    changeType: NegotiableQuoteHistoryEntryChangeType;
    changes: {
        commentAdded?: {
            comment: string;
        };
        customChanges?: {
            new_value: string;
            old_value: string;
            title: string;
        };
        expiration?: {
            newExpiration: string;
            oldExpiration: string;
        };
        productsRemoved?: {
            productsRemovedFromCatalog: string[];
            productsRemovedFromQuote?: {
                uid: string;
                name: string;
                sku: string;
                quantity: number;
            }[];
        };
        statuses?: {
            changes: {
                newStatus: string;
                oldStatus: string;
            }[];
        };
        total?: {
            newPrice: Currency;
            oldPrice: Currency;
        };
    };
    createdAt: string;
    uid: string;
}
export declare enum NegotiableQuoteHistoryEntryChangeType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    CLOSED = "CLOSED",
    UPDATED_BY_SYSTEM = "UPDATED_BY_SYSTEM"
}
export declare enum NegotiableQuoteStatus {
    NEW = "NEW",
    SUBMITTED = "SUBMITTED",
    PENDING = "PENDING",
    UPDATED = "UPDATED",
    OPEN = "OPEN",
    ORDERED = "ORDERED",
    CLOSED = "CLOSED",
    DECLINED = "DECLINED",
    EXPIRED = "EXPIRED",
    DRAFT = "DRAFT"
}
export interface PaginationInfo {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    startItem: number;
    endItem: number;
    totalPages: number;
    pageSizeOptions?: number[];
}
export interface PermissionsModel {
    all?: boolean;
    admin?: boolean;
    [key: string]: boolean | undefined;
}
export {};
//# sourceMappingURL=storefront.d.ts.map