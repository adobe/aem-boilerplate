import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CartItemModel } from '../../data/models/negotiable-quote-model';

export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    items: CartItemModel[];
    canEdit: boolean;
    readOnly?: boolean;
    showActions?: boolean;
    onItemCheckboxChange?: (item: CartItemModel, isSelected: boolean) => void;
    onItemDropdownChange?: (item: CartItemModel, action: string) => void;
    onQuantityChange?: (item: CartItemModel, newQuantity: number) => void;
    onUpdate?: (e: SubmitEvent) => void;
    dropdownSelections?: Record<string, string | undefined>;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
//# sourceMappingURL=ProductListTable.d.ts.map