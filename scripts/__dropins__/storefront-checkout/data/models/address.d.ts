import { Region, Country, ShippingMethod, CustomAttribute } from '.';

export type Address = {
    firstName: string;
    lastName: string;
    company?: string;
    street: string[];
    city: string;
    postCode?: string;
    vatId?: string;
    telephone?: string;
    region?: Region;
    country: Country;
    customAttributes: CustomAttribute[];
};
export type ShippingAddress = Address & {
    availableShippingMethods?: ShippingMethod[];
    selectedShippingMethod?: ShippingMethod;
};
export type BillingAddress = Address;
//# sourceMappingURL=address.d.ts.map