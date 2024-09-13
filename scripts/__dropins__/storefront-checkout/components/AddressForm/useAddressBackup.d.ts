import { AddressFormType, AddressFormValues } from '../../data/models/address-form-fields';

export declare function useAddressBackup(addressType: AddressFormType): {
    addressBackup: AddressFormValues | null;
    backupAddress: (address: AddressFormValues) => NodeJS.Timeout;
    removeAddressBackup: () => void;
};
//# sourceMappingURL=useAddressBackup.d.ts.map