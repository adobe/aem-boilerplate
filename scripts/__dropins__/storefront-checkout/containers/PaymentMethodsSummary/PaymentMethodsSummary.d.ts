import { PaymentMethod } from '../../data/models';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodsSummaryData {
    selectedPaymentMethod: PaymentMethod | null;
}
export interface PaymentMethodsSummaryProps extends HTMLAttributes<HTMLDivElement> {
    onEditClick?: () => void;
    slots?: {
        Heading?: SlotProps;
        Details?: SlotProps<{
            selectedPaymentMethod: PaymentMethod;
        }>;
    };
}
export declare const PaymentMethodsSummary: Container<PaymentMethodsSummaryProps, PaymentMethodsSummaryData>;
//# sourceMappingURL=PaymentMethodsSummary.d.ts.map