import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';

export interface ItemsQuotedTemplateProps extends HTMLAttributes<HTMLDivElement> {
    templateData?: NegotiableQuoteTemplateModel;
    slots?: {
        ProductListTable?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            canEdit: boolean;
            onItemDropdownChange?: (item: any, action: string) => void;
            dropdownSelections?: Record<string, string>;
        }>;
        QuotePricesSummary?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            prices: NegotiableQuoteTemplateModel['prices'];
        }>;
    };
}
export declare const ItemsQuotedTemplate: Container<ItemsQuotedTemplateProps>;
//# sourceMappingURL=ItemsQuotedTemplate.d.ts.map