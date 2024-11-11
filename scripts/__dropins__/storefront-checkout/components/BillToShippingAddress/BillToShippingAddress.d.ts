import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface BillToShippingAddressProps extends Omit<HTMLAttributes<HTMLInputElement>, 'loading' | 'disabled'> {
    loading?: boolean;
    disabled?: boolean;
}
export declare const BillToShippingAddress: FunctionComponent<BillToShippingAddressProps>;
//# sourceMappingURL=BillToShippingAddress.d.ts.map