import { AttributeFrontendInputEnum, ValidationRuleEnum } from '../../__generated__/types';
import { PickerOption } from '@dropins/tools/types/elsie/src/components';

type AddressFormFieldRule = {
    name: ValidationRuleEnum;
    value: string;
};
type AddressFormField = {
    code: string;
    defaultValue?: string;
    frontendInput?: AttributeFrontendInputEnum;
    isDisabled: boolean;
    isRequired: boolean;
    label?: string;
    multilineCount?: number;
    options: PickerOption[];
    sortOrder?: number;
    validateRules?: AddressFormFieldRule[];
};
type FieldEvents = {
    handleSelect?: (event: Event) => void;
    onBlur: (event: Event) => void;
    onChange: (event: Event) => void;
    onInvalid: (event: Event) => void;
};
type FieldValues = {
    error: string | string[];
    value: string | string[];
};
type AddressFormElement = AddressFormField & FieldEvents & FieldValues;
declare enum AddressFormType {
    SHIPPING = "shipping_addresses",
    BILLING = "billing_address"
}
declare enum AddressFormFieldCode {
    City = "city",
    Company = "company",
    Country = "country_id",
    FirstName = "firstname",
    LastName = "lastname",
    PostCode = "postcode",
    Region = "region",
    RegionId = "region_id",
    SaveInAddressBook = "save_in_address_book",
    Street = "street",
    Telephone = "telephone",
    Vat = "vat_id"
}
type AddressFormValues = Record<string, string>;
type AddressFormErrors = Record<string, string>;
export { AddressFormElement, AddressFormErrors, AddressFormField, AddressFormFieldCode, AddressFormType, AddressFormValues, };
//# sourceMappingURL=address-form-fields.d.ts.map