import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface PaymentOnAccountProps extends HTMLAttributes<HTMLDivElement> {
    initialReferenceNumber?: string;
    onReferenceNumberChange?: (referenceNumber: string) => void;
    onReferenceNumberBlur?: (referenceNumber: string) => void;
}
export declare const PaymentOnAccount: Container<PaymentOnAccountProps>;
//# sourceMappingURL=PaymentOnAccount.d.ts.map