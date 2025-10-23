import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteListEntry } from '../../data/models';

export interface QuotesListTableProps extends HTMLAttributes<HTMLDivElement> {
    pageSize?: number;
    showItemRange?: boolean;
    showPageSizePicker?: boolean;
    showPagination?: boolean;
    onViewQuote?: (quoteId: string, quoteName: string, status: string) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onPageChange?: (page: number) => void;
    slots?: {
        /** Slot for customizing the quote name cell content */
        QuoteName?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the created date cell content */
        Created?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the created by cell content */
        CreatedBy?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the status cell content */
        Status?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the last updated cell content */
        LastUpdated?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the quote template cell content */
        QuoteTemplate?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the quote total cell content */
        QuoteTotal?: SlotProps<{
            quote: NegotiableQuoteListEntry;
        }>;
        /** Slot for customizing the actions cell content */
        Actions?: SlotProps<{
            quote: NegotiableQuoteListEntry;
            onViewQuote?: (id: string, name: string, status: string) => void;
        }>;
        /** Slot for customizing the empty quotes message */
        EmptyQuotes?: SlotProps;
        /** Slot for customizing the item range display */
        ItemRange?: SlotProps<{
            startItem: number;
            endItem: number;
            totalCount: number;
            currentPage: number;
            pageSize: number;
        }>;
        /** Slot for customizing the page size picker */
        PageSizePicker?: SlotProps<{
            pageSize: number;
            pageSizeOptions: number[];
            onPageSizeChange?: (pageSize: number) => void;
        }>;
        /** Slot for customizing the pagination */
        Pagination?: SlotProps<{
            currentPage: number;
            totalPages: number;
            onChange?: (page: number) => void;
        }>;
    };
}
export declare const QuotesListTable: Container<QuotesListTableProps>;
//# sourceMappingURL=QuotesListTable.d.ts.map