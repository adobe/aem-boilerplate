/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface ShippingAddress {
    /**
     * The unique string identifier of the address
     */
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
    isVirtual: boolean;
    buyer: {
        firstname: string;
        lastname: string;
    };
    templateName?: string;
    totalQuantity: number;
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
    lockedForEditing?: boolean;
    canDelete: boolean;
    canClose: boolean;
    canUpdateQuote: boolean;
    readOnly: boolean;
}
export interface ConfigurableOption {
    optionLabel: string;
    valueLabel: string;
}
export interface BundleOption {
    label: string;
    values: {
        label: string;
        quantity: number;
        originalPrice: Currency;
        price: Currency;
    }[];
}
export interface CustomizableOption {
    type: string;
    label: string;
    values: {
        label: string;
        value: string;
    }[];
}
export interface NegotiableQuoteCartItem {
    itemType: string;
    uid: string;
    product: {
        uid: string;
        sku: string;
        name: string;
        templateId?: string;
        templateName?: string;
        priceRange: {
            maximumPrice: {
                regularPrice: Currency;
            };
        };
    };
    image: ItemImage;
    links?: ItemLinks;
    discounted: boolean;
    discountedTotal: Currency;
    catalogDiscount: {
        amountOff: number;
        percentOff: number;
    };
    discounts: {
        label: string;
        value: string;
        amount: Currency;
    }[];
    discountPercentage?: number;
    insufficientQuantity?: boolean;
    outOfStock?: boolean;
    stockStatus: string;
    quantity: number;
    prices: {
        regularPrice: Currency;
        priceIncludingTax: Currency;
        originalItemPrice: Currency;
        originalRowTotal: Currency;
        rowTotal: Currency;
        rowTotalIncludingTax: Currency;
    };
    savingsAmount?: Currency;
    configurableOptions?: ConfigurableOption[];
    bundleOptions?: BundleOption[];
    customizableOptions?: CustomizableOption[];
    noteFromBuyer?: ItemNote[];
    noteFromSeller?: ItemNote[];
}
interface ItemImage {
    src: string;
    alt: string;
}
interface ItemLinks {
    count: number;
    result: string;
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
export {};
//# sourceMappingURL=negotiable-quote-model.d.ts.map