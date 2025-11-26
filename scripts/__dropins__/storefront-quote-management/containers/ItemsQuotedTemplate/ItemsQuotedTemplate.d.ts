import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';
import { ProductListTableItem } from '../../components';

export interface ItemsQuotedTemplateProps extends HTMLAttributes<HTMLDivElement> {
    templateData?: NegotiableQuoteTemplateModel;
    slots?: {
        ProductListTable?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            canEdit: boolean;
            dropdownSelections: Record<string, string | undefined>;
            handleItemDropdownChange: (item: ProductListTableItem, action: string) => void;
            handleQuantityChange: (item: ProductListTableItem, newQuantity: number) => void;
            handleUpdate: (e: SubmitEvent) => void;
            onItemDropdownChange?: (item: any, action: string) => void;
        }>;
        QuotePricesSummary?: SlotProps<{
            items: NegotiableQuoteTemplateModel['items'];
            prices: NegotiableQuoteTemplateModel['prices'];
        }>;
    };
}
export declare const ItemsQuotedTemplate: Container<ItemsQuotedTemplateProps>;
//# sourceMappingURL=ItemsQuotedTemplate.d.ts.map