import { PaymentMethodConfig } from '../../containers';
import { PaymentMethod } from '../../data/models/payment-method';
import { UIComponentType } from '../../types';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

interface ExtendedPaymentMethod extends PaymentMethodConfig, PaymentMethod {
}
export interface PaymentMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    error?: string | null;
    busy?: boolean;
    onDismissError?: () => void;
    onSelectionChange?: (value: PaymentMethod) => void;
    options?: ExtendedPaymentMethod[];
    paymentMethodContent?: VNode;
    selection: PaymentMethod | null;
    title?: VNode;
    UIComponentType?: UIComponentType;
}
export declare const PaymentMethods: FunctionComponent<PaymentMethodsProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
export {};
//# sourceMappingURL=PaymentMethods.d.ts.map