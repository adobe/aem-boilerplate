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
    }[];
    prices: {
        subtotalExcludingTax?: Currency;
        subtotalIncludingTax?: Currency;
        subtotalWithDiscountExcludingTax?: Currency;
        grandTotal?: Currency;
        appliedTaxes?: {
            amount: Currency;
            label: string;
        }[];
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
}
export interface Currency {
    value: number;
    currency: string;
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
//# sourceMappingURL=negotiable-quote-model.d.ts.map