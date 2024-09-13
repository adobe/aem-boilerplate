import { FunctionComponent } from 'preact';
import { CheckboxProps } from '@dropins/tools/types/elsie/src/components';

export interface BillToShippingAddressProps extends Omit<CheckboxProps, 'name' | 'label'> {
    isInitialized?: boolean;
}
export declare const BillToShippingAddress: FunctionComponent<BillToShippingAddressProps>;
//# sourceMappingURL=BillToShippingAddress.d.ts.map