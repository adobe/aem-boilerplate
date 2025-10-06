import { Container } from '@dropins/tools/types/elsie/src/lib';
import { CustomerAddressesModel } from '../../data/models';

export interface AddressValidationProps {
    selectedAddress?: 'suggested' | 'original' | null;
    suggestedAddress: Partial<CustomerAddressesModel> | null;
    originalAddress: CustomerAddressesModel | null;
    handleSelectedAddress?: (payload: {
        selection: 'suggested' | 'original';
        address: CustomerAddressesModel | null | undefined;
    }) => void;
}
export declare const AddressValidation: Container<AddressValidationProps>;
//# sourceMappingURL=AddressValidation.d.ts.map