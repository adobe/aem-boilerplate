import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PriceProps extends HTMLAttributes<HTMLDivElement> {
    price?: VNode;
    specialPrice?: VNode;
}
export declare const Price: FunctionComponent<PriceProps>;
//# sourceMappingURL=Price.d.ts.map