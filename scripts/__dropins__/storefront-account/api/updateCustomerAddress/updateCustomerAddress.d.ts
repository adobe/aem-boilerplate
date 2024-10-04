import { CustomerAddressesModel } from '../../data/models';

type ExtendedAddressFormProps = CustomerAddressesModel & {
    addressId: number;
};
export declare const updateCustomerAddress: (forms: ExtendedAddressFormProps) => Promise<string>;
export {};
//# sourceMappingURL=updateCustomerAddress.d.ts.map