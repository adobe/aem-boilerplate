import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OrderSummaryLineComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'label'> {
    label: VNode | string;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    classSuffixes?: Array<string>;
    labelClassSuffix?: string;
    testId?: string;
    children?: any;
}
export declare const OrderSummaryLine: FunctionComponent<OrderSummaryLineComponentProps>;
//# sourceMappingURL=OrderSummaryLine.d.ts.map