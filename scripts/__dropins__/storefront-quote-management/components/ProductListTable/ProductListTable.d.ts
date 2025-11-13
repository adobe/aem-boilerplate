import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ProductListTableItem {
    uid: string;
    product: {
        name: string;
        sku: string;
    };
    prices: {
        originalItemPrice: {
            value: number;
            currency: string;
        };
        rowTotal: {
            value: number;
            currency: string;
        };
    };
    quantity: number;
    catalogDiscount?: {
        amountOff: number;
        percentOff: number;
    };
    configurableOptions?: Array<{
        optionLabel: string;
        valueLabel: string;
    }>;
    bundleOptions?: Array<{
        label: string;
        values: Array<{
            label: string;
            quantity: number;
            originalPrice: {
                value: number;
                currency: string;
            };
        }>;
    }>;
}
export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    items: ProductListTableItem[];
    canEdit: boolean;
    readOnly?: boolean;
    onItemCheckboxChange?: (item: ProductListTableItem, isSelected: boolean) => void;
    onItemDropdownChange?: (item: ProductListTableItem, action: string) => void;
    onQuantityChange?: (item: ProductListTableItem, newQuantity: number) => void;
    onUpdate?: (e: SubmitEvent) => void;
    dropdownSelections?: Record<string, string | undefined>;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
//# sourceMappingURL=ProductListTable.d.ts.map