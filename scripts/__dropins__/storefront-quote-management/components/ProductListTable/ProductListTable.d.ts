import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { NegotiableQuoteCartItem } from '../../data/models/negotiable-quote-model';

export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    items: NegotiableQuoteCartItem[];
    canEdit: boolean;
    onItemCheckboxChange?: (item: NegotiableQuoteCartItem, isSelected: boolean) => void;
    onItemDropdownChange?: (item: NegotiableQuoteCartItem, action: string) => void;
    onUpdate?: (e: SubmitEvent) => void;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
//# sourceMappingURL=ProductListTable.d.ts.map