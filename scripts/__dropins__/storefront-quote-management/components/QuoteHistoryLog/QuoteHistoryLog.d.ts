import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface HistoryEntry {
    uid: string;
    createdAt: string;
    author: {
        firstname: string;
        lastname: string;
    };
    changeType: string;
    changes: {
        commentAdded?: {
            comment: string;
        };
        statuses?: {
            changes: Array<{
                oldStatus?: string;
                newStatus?: string;
            }>;
        };
        expiration?: {
            oldExpiration?: string;
            newExpiration?: string;
        };
        total?: {
            oldPrice?: {
                value: number;
                currency: string;
            };
            newPrice?: {
                value: number;
                currency: string;
            };
        };
        customChanges?: {
            title: string;
            old_value: string;
            new_value: string;
        };
        productsRemoved?: {
            productsRemovedFromCatalog?: string[];
            productsRemovedFromQuote?: Array<{
                name?: string;
                sku?: string;
                uid: string;
            }>;
        };
    };
}
export interface ItemNote {
    createdAt: string;
    creatorId: number;
    creatorType: number;
    negotiableQuoteItemUid: string;
    note: string;
    noteUid: string;
}
export interface QuoteItem {
    product: {
        name: string;
        sku: string;
    };
    noteFromBuyer?: ItemNote[];
    noteFromSeller?: ItemNote[];
}
export interface QuoteHistoryLogProps extends HTMLAttributes<HTMLDivElement> {
    history?: HistoryEntry[];
    items?: QuoteItem[];
    buyer: {
        firstname: string;
        lastname: string;
    };
    salesRepName: string;
}
export declare const QuoteHistoryLog: FunctionComponent<QuoteHistoryLogProps>;
//# sourceMappingURL=QuoteHistoryLog.d.ts.map