import { Currency, PaginationInfo, ShippingAddress, NegotiableQuoteHistoryEntry, CartItemModel } from './negotiable-quote-model';

export interface NegotiableQuoteTemplateModel {
    id: string;
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
    history?: NegotiableQuoteHistoryEntry[];
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
    items: CartItemModel[];
    shippingAddresses?: ShippingAddress[];
    referenceDocuments?: {
        uid: string;
        name: string;
        identifier?: string;
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
    canSendForReview: boolean;
    canGenerateQuoteFromTemplate: boolean;
    canEditTemplateItems: boolean;
}
export declare enum NegotiableQuoteTemplateStatus {
    ACTIVE = "Active",
    IN_REVIEW = "In Review",
    INACTIVE = "Inactive",
    SUBMITTED = "Submitted",
    PENDING = "Pending",
    CLOSED = "Closed",
    OPEN = "Open",
    UPDATED = "Updated",
    EDITED = "Edited",
    NEW = "New",
    DRAFT = "Draft",
    DECLINED = "Declined",
    CANCELED = "Canceled",
    EXPIRED = "Expired"
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
    canGenerateQuoteFromTemplate?: boolean;
}
//# sourceMappingURL=negotiable-quote-template-model.d.ts.map