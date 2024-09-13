import { AddressFormElement, AddressFormErrors, AddressFormField, AddressFormType, AddressFormValues, Country, Region, StoreConfig } from '../../data/models';
import { StateUpdater, Dispatch } from 'preact/hooks';

export type FormFieldsProcessorProps = {
    address: AddressFormValues;
    addressType: AddressFormType;
    availableCountries: Country[] | undefined;
    availableRegions: Region[];
    config: StoreConfig;
    dismissError: (code: string) => void;
    errors: AddressFormErrors;
    fields: AddressFormField[];
    onBlur: (event: Event) => void;
    onChange: (event: Event) => void;
    onInvalid: (event: Event) => void;
    onSelection: (event: Event) => void;
    setAddress: Dispatch<StateUpdater<AddressFormValues>>;
};
export declare function processFormFields({ address, addressType, availableCountries, availableRegions, config, dismissError, errors, fields, onBlur, onChange, onInvalid, onSelection, setAddress, }: FormFieldsProcessorProps): AddressFormElement[];
export type ProcessedFormFields = ReturnType<typeof processFormFields>;
//# sourceMappingURL=processFormFields.d.ts.map