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
    description?: VNode;
    configurations?: {
        [key: string]: any;
    };
    warning?: VNode;
    alert?: VNode;
    loading?: boolean;
    updating?: boolean;
    onRemove?: () => void;
    onQuantity?: (value: number) => void;
}
export declare const CartItem: FunctionComponent<CartItemProps>;
//# sourceMappingURL=CartItem.d.ts.map