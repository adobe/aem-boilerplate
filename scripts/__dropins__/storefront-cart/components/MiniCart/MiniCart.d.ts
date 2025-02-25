import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface MiniCartProps extends HTMLAttributes<HTMLDivElement> {
    products?: VNode;
    productListFooter?: VNode;
    subtotal?: VNode;
    subtotalExcludingTaxes?: VNode;
    preCheckoutSection?: VNode;
    ctas?: VNode;
}
export declare const MiniCart: FunctionComponent<MiniCartProps>;
//# sourceMappingURL=MiniCart.d.ts.map