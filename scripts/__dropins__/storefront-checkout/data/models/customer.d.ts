import { Region, Country, CustomAttribute } from '.';

export type CustomerAddress = {
    id: string;
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
export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    addresses: CustomerAddress[];
    defaultBillingAddress?: CustomerAddress;
    defaultShippingAddress?: CustomerAddress;
};
//# sourceMappingURL=customer.d.ts.map