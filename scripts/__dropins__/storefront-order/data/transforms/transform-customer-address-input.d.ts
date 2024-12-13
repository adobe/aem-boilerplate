import { OrderAddressModel } from '../models';

export declare function transformCustomerAddressInput(address: OrderAddressModel): {
    region: {
        region_id: number | null;
        region: string | undefined;
    };
    city: string | undefined;
    company: string | undefined;
    country_code: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    middlename: string | undefined;
    postcode: string | undefined;
    street: string[] | undefined;
    telephone: string | undefined;
    custom_attributesV2: {
        attribute_code: string;
        value: string;
    }[];
};
//# sourceMappingURL=transform-customer-address-input.d.ts.map