import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateListEntry } from '../../data/models';

export interface QuoteTemplatesListTableProps extends HTMLAttributes<HTMLDivElement> {
    pageSize?: number;
    showItemRange?: boolean;
    showPageSizePicker?: boolean;
    showPagination?: boolean;
    onViewQuoteTemplate?: (templateId: string, templateName: string, status: string) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onPageChange?: (page: number) => void;
    slots?: {
        /** Slot for customizing the template name cell content */
        Name?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the state cell content */
        State?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the status cell content */
        Status?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the valid until cell content */
        ValidUntil?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the min quote total cell content */
        MinQuoteTotal?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the orders placed cell content */
        OrdersPlaced?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the last ordered cell content */
        LastOrdered?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
        }>;
        /** Slot for customizing the actions cell content */
        Actions?: SlotProps<{
            template: NegotiableQuoteTemplateListEntry;
            onViewQuoteTemplate?: (id: string, name: string, status: string) => void;
        }>;
        /** Slot for customizing the empty templates message */
        EmptyTemplates?: SlotProps;
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
export declare const QuoteTemplatesListTable: Container<QuoteTemplatesListTableProps>;
//# sourceMappingURL=QuoteTemplatesListTable.d.ts.map