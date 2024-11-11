import { CustomAttribute } from './custom-attribute';

export interface CartAddress {
    city: string;
    company?: string;
    countryCode: string;
    customAttributes: CustomAttribute[];
    firstName: string;
    lastName: string;
    postcode?: string;
    region?: string;
    regionId?: number;
    saveInAddressBook?: boolean;
    street: string[];
    telephone?: string;
    vatId?: string;
}
export interface ShippingAddressInput {
    address?: CartAddress;
    customerAddressId?: number;
    pickupLocationCode?: string;
}
export interface BillingAddressInput {
    address?: CartAddress;
    customerAddressId?: number;
    sameAsShipping?: boolean;
    useForShipping?: boolean;
}
//# sourceMappingURL=api.d.ts.map