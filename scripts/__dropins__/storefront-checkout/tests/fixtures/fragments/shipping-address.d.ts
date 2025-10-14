/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export declare const shippingAddressFixture: {
    uid: string;
    firstname: string;
    lastname: string;
    company: null;
    street: string[];
    city: string;
    postcode: string;
    vat_id: null;
    country: {
        code: string;
        label: string;
    };
    same_as_billing: boolean;
    region: {
        region_id: number;
        code: string;
        label: string;
    };
    telephone: string;
    custom_attributes: never[];
    available_shipping_methods: {
        amount: {
            currency: import('../../../__generated__/types').CurrencyEnum;
            value: number;
        };
        available: boolean;
        carrier_code: string;
        carrier_title: string;
        error_message: string;
        method_code: string;
        method_title: string;
        price_excl_tax: {
            value: number;
            currency: import('../../../__generated__/types').CurrencyEnum;
        };
        price_incl_tax: {
            value: number;
            currency: import('../../../__generated__/types').CurrencyEnum;
        };
    }[];
    selected_shipping_method: null;
    prefix: string;
    suffix: string;
    middlename: string;
    fax: string;
};
//# sourceMappingURL=shipping-address.d.ts.map