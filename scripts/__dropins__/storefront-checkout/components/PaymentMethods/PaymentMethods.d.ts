import { PaymentMethodConfig } from '../../containers';
import { PaymentMethod } from '../../data/models/payment-method';
import { UIComponentType } from '../../types/ComponentTypes';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

interface ExtendedPaymentMethod extends PaymentMethodConfig, PaymentMethod {
}
export interface PaymentMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'loading' | 'title'> {
    isLoading?: boolean;
    onChange?: (value: string) => void;
    options?: ExtendedPaymentMethod[];
    paymentMethodContent?: VNode;
    selection?: string;
    title?: VNode;
    UIComponentType?: UIComponentType;
}
export declare const PaymentMethods: FunctionComponent<PaymentMethodsProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
export {};
//# sourceMappingURL=PaymentMethods.d.ts.map