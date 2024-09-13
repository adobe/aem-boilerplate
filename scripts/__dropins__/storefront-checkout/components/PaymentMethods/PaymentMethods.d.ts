import { PaymentMethod } from '../../data/models/payment-method';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    paymentMethodContent?: VNode;
    isLoading?: boolean;
    onChange?: (value: string) => void;
    options?: PaymentMethod[];
    selection?: string;
}
export declare const PaymentMethods: FunctionComponent<PaymentMethodsProps>;
//# sourceMappingURL=PaymentMethods.d.ts.map