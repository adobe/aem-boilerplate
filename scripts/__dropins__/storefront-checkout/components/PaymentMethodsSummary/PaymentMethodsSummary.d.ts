import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodsSummaryProps extends HTMLAttributes<HTMLDivElement> {
    details: VNode;
    heading?: VNode;
    onEditClick?: () => void;
}
export declare const PaymentMethodsSummary: FunctionComponent<PaymentMethodsSummaryProps>;
export default PaymentMethodsSummary;
//# sourceMappingURL=PaymentMethodsSummary.d.ts.map