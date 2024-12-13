import { CustomerAddressesModel } from '../data/models';

type CustomAttributesType = {
    customAttributes?: {
        code: string;
        value: string;
    }[];
};
export declare const transformDefaultValuesAddresses: (address?: CustomerAddressesModel & CustomAttributesType) => CustomerAddressesModel;
export {};
//# sourceMappingURL=transformDefaultValuesAddresses.d.ts.map