import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteModel, NegotiableQuoteCartItem } from '../../data/models/negotiable-quote-model';

export interface ItemsQuotedProps extends HTMLAttributes<HTMLDivElement> {
    quoteData?: NegotiableQuoteModel;
    onItemCheckboxChange?: (item: NegotiableQuoteCartItem, isSelected: boolean) => void;
    onItemDropdownChange?: (item: NegotiableQuoteCartItem, action: string) => void;
    onUpdate?: (e: SubmitEvent) => void;
    slots?: {
        ProductListTable?: SlotProps<{
            items: NegotiableQuoteModel['items'];
            canEdit: boolean;
            onItemCheckboxChange?: (item: NegotiableQuoteCartItem, isSelected: boolean) => void;
            onItemDropdownChange?: (item: NegotiableQuoteCartItem, action: string) => void;
            onUpdate?: (e: SubmitEvent) => void;
        }>;
        QuotePricesSummary?: SlotProps<{
            items: NegotiableQuoteModel['items'];
            prices: NegotiableQuoteModel['prices'];
        }>;
    };
}
export declare const ItemsQuoted: Container<ItemsQuotedProps>;
//# sourceMappingURL=ItemsQuoted.d.ts.map