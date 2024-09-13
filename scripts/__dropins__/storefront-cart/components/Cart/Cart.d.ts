import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CartProps extends HTMLAttributes<HTMLDivElement> {
    empty?: boolean;
    products?: VNode;
    orderSummary?: VNode<HTMLAttributes<HTMLElement>>;
}
export declare const Cart: FunctionComponent<CartProps>;
//# sourceMappingURL=Cart.d.ts.map