import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CartItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'loading'> {
    ariaLabel?: string;
    image?: VNode;
    title?: VNode;
    price?: VNode;
    taxIncluded?: boolean;
    taxExcluded?: boolean;
    total?: VNode;
    totalExcludingTax?: VNode;
    sku?: VNode;
    quantity?: number;
    quantityContent?: VNode;
    description?: VNode;
    attributes?: VNode;
    footer?: VNode;
    configurations?: {
        [key: string]: any;
    };
    warning?: VNode;
    alert?: VNode;
    discount?: VNode;
    savings?: VNode;
    actions?: VNode;
    removeContent?: VNode;
    loading?: boolean;
    updating?: boolean;
    onRemove?: () => void;
    onQuantity?: (value: number) => void;
    quantityType?: 'stepper' | 'dropdown';
    dropdownOptions?: {
        value: string;
        text: string;
    }[];
}
export declare const CartItem: FunctionComponent<CartItemProps>;
//# sourceMappingURL=CartItem.d.ts.map