import { BillingAddress, ShippingAddress } from '../../data/models/address';
import { AddressFormField } from '../../data/models/address-form-fields';
import { CheckboxProps } from '@dropins/tools/types/elsie/src/components';

export declare function compareAddresses(addressFormFields: AddressFormField[], first: BillingAddress | undefined, second: ShippingAddress | undefined): boolean;
export interface BillToShippingAddressProps extends Omit<CheckboxProps, 'name' | 'label'> {
}
export declare const BillToShippingAddress: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & BillToShippingAddressProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=BillToShippingAddress.d.ts.map