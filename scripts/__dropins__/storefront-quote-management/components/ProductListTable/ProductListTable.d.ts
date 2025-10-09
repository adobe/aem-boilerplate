import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    items: NegotiableQuoteModel['items'];
    canEdit: boolean;
    onItemCheckboxChange?: (item: NegotiableQuoteModel['items'][number], isSelected: boolean) => void;
    onItemDropdownChange?: (item: NegotiableQuoteModel['items'][number], action: string) => void;
    onUpdate?: (e: SubmitEvent) => void;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
//# sourceMappingURL=ProductListTable.d.ts.map