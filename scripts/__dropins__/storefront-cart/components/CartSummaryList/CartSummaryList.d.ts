import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CartSummaryListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    heading?: VNode | null;
    emptyCart: VNode;
    products?: VNode | null;
    outOfStockMessage?: VNode | null;
    loading?: boolean;
}
export declare const CartSummaryList: FunctionComponent<CartSummaryListProps>;
//# sourceMappingURL=CartSummaryList.d.ts.map