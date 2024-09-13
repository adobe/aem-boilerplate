import { PreselectedAddressFields } from '../../containers';
import { AddressFormField, AddressFormValues } from '../../data/models/address-form-fields';

export type UsePreselectedFieldsProps = {
    fields?: AddressFormField[];
    preselectedFields?: PreselectedAddressFields;
};
export declare function usePreselectedFields({ fields, preselectedFields, }: UsePreselectedFieldsProps): AddressFormValues;
//# sourceMappingURL=usePreselectedFields.d.ts.map