export declare const STANDARD_ATTRIBUTES: string[];
export interface AddressInput {
    city: string;
    company?: string;
    country_code: string;
    custom_attributes?: {
        attribute_code: string;
        value?: string;
        selected_options?: {
            uid: string;
            value: string;
        }[];
    }[];
    firstname: string;
    lastname: string;
    postcode?: string;
    region?: string;
    region_id?: number;
    save_in_address_book?: boolean;
    street: string[];
    telephone?: string;
    vat_id?: string;
}
export interface setShippingAddressParams {
    address: AddressInput;
    signal?: AbortSignal;
}
export declare const prepareAddress: (formFields: Record<string, any>) => AddressInput;
export declare const setShippingAddress: ({ signal, address, }: setShippingAddressParams) => Promise<import('../../data/models').Cart | null | undefined>;
//# sourceMappingURL=setShippingAddress.d.ts.map