import { PaymentMethod } from '../../data/models/payment-method';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { PaymentMethodConfig } from '../../containers';

interface ExtendedPaymentMethod extends PaymentMethodConfig, PaymentMethod {
}
export interface PaymentMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'loading'> {
    initializing?: boolean;
    loading?: boolean;
    onChange?: (value: string) => void;
    options?: ExtendedPaymentMethod[];
    paymentMethodContent?: VNode;
    selection?: string;
}
export declare const PaymentMethods: FunctionComponent<PaymentMethodsProps>;
export {};
//# sourceMappingURL=PaymentMethods.d.ts.map