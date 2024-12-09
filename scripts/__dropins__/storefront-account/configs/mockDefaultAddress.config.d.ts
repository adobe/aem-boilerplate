export declare const mockResponseInputFieldsList: ({
    default_value: null;
    entity_type: string;
    frontend_class: null;
    frontend_input: string;
    required: boolean;
    is_unique: boolean;
    label: string;
    options: never[];
    multiline_count: number;
    sort_order: number;
    validate_rules: never[];
    name: string;
    id: string;
    code: string;
    isHidden?: undefined;
} | {
    default_value: boolean;
    entity_type: string;
    is_unique: boolean;
    options: never[];
    multiline_count: number;
    validate_rules: never[];
    frontend_input: string;
    frontend_class: string;
    required: boolean;
    sort_order: number;
    isHidden: boolean;
    label: string;
    name: string;
    id: string;
    code: string;
})[];
export declare const mockInputFieldsList: ({
    defaultValue: null;
    entityType: string;
    className: null;
    fieldType: string;
    required: boolean;
    isUnique: boolean;
    label: string;
    options: never[];
    multilineCount: number;
    orderNumber: number;
    validateRules: never[];
    name: string;
    id: string;
    code: string;
    customUpperCode: string;
    isHidden?: undefined;
} | {
    entityType: string;
    isUnique: boolean;
    options: never[];
    multilineCount: number;
    validateRules: never[];
    defaultValue: boolean;
    fieldType: string;
    className: string;
    required: boolean;
    orderNumber: number;
    isHidden: boolean;
    label: string;
    name: string;
    id: string;
    code: string;
    customUpperCode: string;
})[];
export declare const mockKeysSortOrder: ({
    name: string;
    orderNumber: number;
    label: null;
} | {
    name: string;
    orderNumber: number;
    label: string;
})[];
export declare const mockDefaultAddress: {
    firstname: string;
    lastname: string;
    city: string;
    company: string;
    countryCode: string;
    region: {
        region: string;
        regionCode: string;
        regionId: number;
    };
    telephone: string;
    id: string;
    vatId: string;
    postcode: string;
    street: string;
    streetMultiline_2: string;
    defaultShipping: boolean;
    defaultBilling: boolean;
    fax: string;
    middlename: string;
    prefix: string;
    suffix: string;
};
export declare const mockResponseAddressWithText: {
    firstname: string;
    lastname: string;
    city: string;
    company: string;
    country_code: string;
    region: {
        region: string;
        region_code: string;
        region_id: number;
    };
    telephone: string;
    id: string;
    vat_id: string;
    postcode: string;
    street: string[];
    default_shipping: boolean;
    default_billing: boolean;
    custom_attributesV2: never[];
    fax: string;
    middlename: string;
    prefix: string;
    suffix: string;
};
export declare const mockResponseCountries: {
    two_letter_abbreviation: string;
    full_name_locale: string;
}[];
export declare const mockResponseCountriesEmpty: {
    two_letter_abbreviation: null;
    full_name_locale: null;
}[];
export declare const mockDefaultCountries: {
    value: string;
    text: string;
}[];
export declare const mockResponseRegions: {
    id: number;
    code: string;
    name: string;
}[];
export declare const mockResponseRegionsEmpty: {
    id: null;
    code: null;
    name: null;
}[];
export declare const mockDefaultRegions: {
    id: number;
    value: string;
    text: string;
}[];
//# sourceMappingURL=mockDefaultAddress.config.d.ts.map