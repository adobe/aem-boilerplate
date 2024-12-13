import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { VNode } from 'preact';

export interface OrderSummaryLineProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    classSuffixes?: Array<string>;
    labelClassSuffix?: string;
    testId?: string;
    children?: any;
}
export declare const OrderSummaryLine: Container<OrderSummaryLineProps>;
//# sourceMappingURL=OrderSummaryLine.d.ts.map