import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface EstimateShippingProps {
    estimated?: boolean;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceExclTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    taxExcluded?: boolean;
    taxIncluded?: boolean;
}
export declare const EstimateShipping: FunctionComponent<EstimateShippingProps>;
//# sourceMappingURL=EstimateShipping.d.ts.map