import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CartSummaryGridProps extends HTMLAttributes<HTMLDivElement> {
    products?: VNode | null;
    emptyCart: VNode;
}
export declare const CartSummaryGrid: FunctionComponent<CartSummaryGridProps>;
//# sourceMappingURL=CartSummaryGrid.d.ts.map