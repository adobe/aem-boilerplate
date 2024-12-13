import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';

export interface OrderSummaryLineComponentProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    classSuffixes?: Array<string>;
    labelClassSuffix?: string;
    testId?: string;
    children?: any;
}
export declare const OrderSummaryLine: FunctionComponent<OrderSummaryLineComponentProps>;
//# sourceMappingURL=OrderSummaryLine.d.ts.map