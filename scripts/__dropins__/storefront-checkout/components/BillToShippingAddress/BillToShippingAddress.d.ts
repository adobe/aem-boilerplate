import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface BillToShippingAddressProps extends Omit<HTMLAttributes<HTMLInputElement>, 'loading' | 'disabled'> {
    disabled?: boolean;
}
export declare const BillToShippingAddress: FunctionComponent<BillToShippingAddressProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=BillToShippingAddress.d.ts.map