import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    variant?: 'primary' | 'secondary';
    heading?: VNode<HTMLAttributes<HTMLDivElement>>;
    loading?: boolean;
    subTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        taxIncluded?: boolean;
        taxExcluded?: boolean;
        zeroTaxSubtotal?: boolean;
    };
    shipping?: VNode<HTMLAttributes<HTMLDivElement>>;
    discounts?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        caption?: VNode<HTMLAttributes<HTMLDivElement>>;
    }[];
    taxTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
    };
    taxesApplied?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    total?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
        priceWithoutTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    primaryAction?: VNode<HTMLAttributes<HTMLButtonElement>>;
}
export declare const OrderSummary: FunctionComponent<OrderSummaryProps>;
//# sourceMappingURL=OrderSummary.d.ts.map