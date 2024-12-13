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
export declare const cartFixture: {
    __typename?: "Cart" | undefined;
    id: string;
    is_virtual: boolean;
    email?: string | null | undefined;
    total_quantity: number;
    billing_address?: {
        __typename?: "BillingCartAddress" | undefined;
        id?: number | null | undefined;
        city: string;
        firstname: string;
        lastname: string;
        company?: string | null | undefined;
        postcode?: string | null | undefined;
        vat_id?: string | null | undefined;
        street: (string | null)[];
        telephone?: string | null | undefined;
        prefix?: string | null | undefined;
        suffix?: string | null | undefined;
        middlename?: string | null | undefined;
        fax?: string | null | undefined;
        country: {
            __typename?: "CartAddressCountry" | undefined;
            code: string;
            label: string;
        };
        region?: {
            __typename?: "CartAddressRegion" | undefined;
            region_id?: number | null | undefined;
            code?: string | null | undefined;
            label?: string | null | undefined;
        } | null | undefined;
        custom_attributes: ({
            __typename?: "AttributeSelectedOptions" | undefined;
        } | {
            __typename?: "AttributeValue" | undefined;
            code: string;
            value: string;
        } | null)[];
    } | null | undefined;
    shipping_addresses: ({
        __typename?: "ShippingCartAddress" | undefined;
        id?: number | null | undefined;
        firstname: string;
        lastname: string;
        company?: string | null | undefined;
        street: (string | null)[];
        city: string;
        postcode?: string | null | undefined;
        vat_id?: string | null | undefined;
        telephone?: string | null | undefined;
        same_as_billing: boolean;
        prefix?: string | null | undefined;
        suffix?: string | null | undefined;
        middlename?: string | null | undefined;
        fax?: string | null | undefined;
        region?: {
            __typename?: "CartAddressRegion" | undefined;
            region_id?: number | null | undefined;
            code?: string | null | undefined;
            label?: string | null | undefined;
        } | null | undefined;
        country: {
            __typename?: "CartAddressCountry" | undefined;
            code: string;
            label: string;
        };
        custom_attributes: ({
            __typename?: "AttributeSelectedOptions" | undefined;
        } | {
            __typename?: "AttributeValue" | undefined;
            code: string;
            value: string;
        } | null)[];
        available_shipping_methods?: ({
            __typename?: "AvailableShippingMethod" | undefined;
            available: boolean;
            carrier_code: string;
            carrier_title: string;
            error_message?: string | null | undefined;
            method_code?: string | null | undefined;
            method_title?: string | null | undefined;
            amount: {
                __typename?: "Money" | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                value?: number | null | undefined;
            };
            price_excl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
            price_incl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
        } | null)[] | null | undefined;
        selected_shipping_method?: {
            __typename?: "SelectedShippingMethod" | undefined;
            carrier_code: string;
            carrier_title: string;
            method_code: string;
            method_title: string;
            amount: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
            price_excl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
            price_incl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
        } | null | undefined;
    } | null)[];
    available_payment_methods?: ({
        __typename?: "AvailablePaymentMethod" | undefined;
        code: string;
        title: string;
    } | null)[] | null | undefined;
    selected_payment_method?: {
        __typename?: "SelectedPaymentMethod" | undefined;
        code: string;
        title: string;
    } | null | undefined;
} | null | undefined;
//# sourceMappingURL=cart.d.ts.map