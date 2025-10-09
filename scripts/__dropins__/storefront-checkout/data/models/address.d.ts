import { Country, CustomAttribute, Region, ShippingMethod } from '.';

export interface Address {
    city: string;
    company?: string;
    country: Country;
    customAttributes: CustomAttribute[];
    fax?: string;
    firstName: string;
    id?: number;
    lastName: string;
    middleName?: string;
    postCode?: string;
    prefix?: string;
    region?: Region;
    street: string[];
    suffix?: string;
    telephone?: string;
    uid: string;
    vatId?: string;
}
export interface ShippingAddress extends Address {
    availableShippingMethods?: ShippingMethod[];
    selectedShippingMethod?: ShippingMethod;
}
//# sourceMappingURL=address.d.ts.map