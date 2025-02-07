import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CheckoutPaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    status: 'loading' | 'ready';
    paymentMethodsContent?: VNode<HTMLAttributes<HTMLDivElement>>;
}
export declare const CheckoutPaymentMethods: FunctionComponent<CheckoutPaymentMethodsProps>;
//# sourceMappingURL=CheckoutPaymentMethods.d.ts.map