export interface CustomerAddressesModel {
    firstName?: string;
    lastName?: string;
    city?: string;
    company?: string;
    countryCode?: string;
    region?: {
        region: string;
        regionCode: string;
        regionId: string | number;
    };
    telephone?: string;
    id?: string;
    vatId?: string;
    postcode?: string;
    street?: string;
    streetMultiline_2?: string;
    defaultShipping?: boolean;
    defaultBilling?: boolean;
}
//# sourceMappingURL=customer-address.d.ts.map