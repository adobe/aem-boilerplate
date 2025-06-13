import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface BillToShippingAddressProps extends Omit<HTMLAttributes<HTMLInputElement>, 'loading' | 'disabled' | 'onChange'> {
    disabled?: boolean;
    error?: string | null;
    onChange?: (checked: boolean) => void;
    onDismissError?: () => void;
}
export declare const BillToShippingAddress: FunctionComponent<BillToShippingAddressProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=BillToShippingAddress.d.ts.map