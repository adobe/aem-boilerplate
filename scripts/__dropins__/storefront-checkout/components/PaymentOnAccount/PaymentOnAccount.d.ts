import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Money } from '../../data/models';

export type CompanyCredit = {
    availableCredit: Money;
    exceedLimit?: boolean;
};
export interface PaymentOnAccountProps extends HTMLAttributes<HTMLFormElement> {
    referenceNumber?: string;
    onReferenceNumberChange?: (event: Event) => void;
    onReferenceNumberBlur?: (event: Event) => void;
    companyCredit?: CompanyCredit | null;
    cartAmount?: Money | null;
}
export declare const PaymentOnAccount: FunctionComponent<PaymentOnAccountProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=PaymentOnAccount.d.ts.map