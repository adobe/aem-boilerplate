import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface EstimateShippingProps {
    label: VNode<HTMLAttributes<HTMLSpanElement>>;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceExclTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    taxExcluded?: boolean;
    taxIncluded?: boolean;
}
export declare const EstimateShipping: FunctionComponent<EstimateShippingProps & import('../ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=EstimateShipping.d.ts.map