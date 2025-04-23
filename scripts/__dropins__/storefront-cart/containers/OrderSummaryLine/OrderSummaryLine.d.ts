import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { VNode } from 'preact';

export interface OrderSummaryLineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'label'> {
    label: VNode | string;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    classSuffixes?: Array<string>;
    labelClassSuffix?: string;
    testId?: string;
    children?: any;
}
export declare const OrderSummaryLine: Container<OrderSummaryLineProps>;
//# sourceMappingURL=OrderSummaryLine.d.ts.map