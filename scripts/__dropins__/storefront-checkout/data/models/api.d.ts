import { CustomAttribute } from '.';

interface ExtensibleInput {
    [key: string]: any;
}
export interface AddressInput {
    city: string;
    company?: string;
    countryCode: string;
    customAttributes?: CustomAttribute[];
    fax?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    postcode?: string;
    prefix?: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    suffix?: string;
    telephone?: string;
    vatId?: string;
}
export interface ShippingAddressInput extends ExtensibleInput {
    address?: AddressInput;
    customerAddressId?: number;
    customerAddressUid?: string;
    pickupLocationCode?: string;
}
export interface BillingAddressInput {
    address?: AddressInput;
    customerAddressId?: number;
    customerAddressUid?: string;
    sameAsShipping?: boolean;
    useForShipping?: boolean;
}
export interface PaymentMethodInput extends ExtensibleInput {
    code: string;
}
export interface ShippingMethodInput extends ExtensibleInput {
    carrierCode: string;
    methodCode: string;
}
export {};
//# sourceMappingURL=api.d.ts.map