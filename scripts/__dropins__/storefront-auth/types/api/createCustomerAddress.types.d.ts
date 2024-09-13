export interface CreateCustomerAddressResponse {
    data: {
        createCustomerAddress: {
            firstname: string;
        };
    };
    errors?: {
        message: string;
    }[];
}
interface Region {
    region_id: number;
    region: string;
    region_code: string;
}
interface CustomAttributes {
    attribute_code: string;
    value: string;
}
interface CustomAttributesV2 extends CustomAttributes {
    selected_options: {
        value: string;
    }[];
}
export interface AddressFormProps {
    region: Region;
    city: string;
    company: string;
    country_code: string;
    country_id: string;
    custom_attributes: CustomAttributes[];
    custom_attributesV2: CustomAttributesV2[];
    default_billing?: boolean;
    default_shipping?: boolean;
    fax: string;
    firstname: string;
    lastname: string;
    middlename: string;
    postcode: string;
    prefix: string;
    street: string[];
    suffix: string;
    telephone: string;
    vat_id: string;
}
export {};
//# sourceMappingURL=createCustomerAddress.types.d.ts.map