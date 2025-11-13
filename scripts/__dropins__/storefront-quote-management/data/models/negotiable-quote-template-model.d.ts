import { Currency, ItemNote, PaginationInfo, ShippingAddress, ConfigurableOption, BundleOption } from './negotiable-quote-model';

export interface NegotiableQuoteTemplateModel {
    uid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    expirationDate?: string;
    status: NegotiableQuoteTemplateStatus;
    salesRepName: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments?: QuoteTemplateComment[];
    history?: QuoteTemplateHistoryEntry[];
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
    items: QuoteTemplateCartItem[];
    shippingAddresses?: ShippingAddress[];
    referenceDocuments?: {
        uid: string;
        name: string;
        url: string;
    }[];
    quantityThresholds?: {
        min?: number;
        max?: number;
    };
    canAccept: boolean;
    canDelete: boolean;
    canReopen: boolean;
    canCancel: boolean;
    canGenerateQuote: boolean;
}
export declare enum NegotiableQuoteTemplateStatus {
    ACTIVE = "ACTIVE",
    IN_REVIEW = "IN_REVIEW",
    INACTIVE = "INACTIVE",
    SUBMITTED = "SUBMITTED",
    PENDING = "PENDING",
    CLOSED = "CLOSED",
    OPEN = "OPEN"
}
export interface QuoteTemplateCartItem {
    uid?: string;
    product: {
        uid: string;
        sku: string;
        name: string;
    };
    quantity: number;
    prices: {
        originalItemPrice: Currency;
        rowTotal: Currency;
    };
    catalogDiscount?: {
        amountOff: number;
        percentOff: number;
    };
    discounts?: {
        label: string;
        value: string;
        amount: Currency;
    }[];
    noteFromBuyer?: ItemNote[];
    noteFromSeller?: ItemNote[];
    configurableOptions?: ConfigurableOption[];
    bundleOptions?: BundleOption[];
}
export interface QuoteTemplateComment {
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
}
export interface QuoteTemplateHistoryEntry {
    uid: string;
    createdAt: string;
    author: {
        firstname: string;
        lastname: string;
    };
    changeType: string;
    changes: any;
}
export interface NegotiableQuoteTemplatesListModel {
    items: NegotiableQuoteTemplateListEntry[];
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
export interface NegotiableQuoteTemplateListEntry {
    id: string;
    uid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    status: NegotiableQuoteTemplateStatus;
    state: 'active' | 'inactive' | 'in_review';
    lastSharedAt: string;
    lastOrderedAt: string;
    expirationDate: string;
    ordersPlaced: number;
    prices: {
        grandTotal: Currency;
        minNegotiatedGrandTotal: Currency;
    };
}
//# sourceMappingURL=negotiable-quote-template-model.d.ts.map