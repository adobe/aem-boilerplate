import { Address as AddressModel, ShippingAddress as ShippingAddressModel } from '../models';
import { GetNegotiableQuoteQuery } from '../../__generated__/types';

type QuoteShippingAddresses = NonNullable<GetNegotiableQuoteQuery['negotiableQuote']>['shipping_addresses'];
type QuoteShippingAddress = QuoteShippingAddresses[0];
type QuoteBillingAddress = NonNullable<GetNegotiableQuoteQuery['negotiableQuote']>['billing_address'];
declare const transformQuoteBillingAddress: (data: QuoteBillingAddress) => AddressModel | undefined;
declare const transformQuoteShippingAddress: (data: ({
    __typename?: "NegotiableQuoteShippingAddress" | undefined;
    city: string;
    company?: string | null | undefined;
    customer_address_uid?: string | null | undefined;
    fax?: string | null | undefined;
    firstname: string;
    lastname: string;
    middlename?: string | null | undefined;
    postcode?: string | null | undefined;
    prefix?: string | null | undefined;
    street: (string | null)[];
    suffix?: string | null | undefined;
    telephone?: string | null | undefined;
    uid: string;
    vat_id?: string | null | undefined;
    available_shipping_methods?: ({
        __typename?: "AvailableShippingMethod" | undefined;
        carrier_code: string;
        carrier_title: string;
        error_message?: string | null | undefined;
        method_code?: string | null | undefined;
        method_title?: string | null | undefined;
        amount: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        price_excl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        price_incl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
    } | null)[] | null | undefined;
    country: {
        __typename?: "NegotiableQuoteAddressCountry" | undefined;
        code: string;
        label: string;
    };
    custom_attributes?: ({
        __typename?: "AttributeSelectedOptions" | undefined;
    } | {
        __typename?: "AttributeValue" | undefined;
        code: string;
        value: string;
    } | null)[] | null | undefined;
    region?: {
        __typename?: "NegotiableQuoteAddressRegion" | undefined;
        region_id?: number | null | undefined;
        code?: string | null | undefined;
        label?: string | null | undefined;
    } | null | undefined;
    selected_shipping_method?: {
        __typename?: "SelectedShippingMethod" | undefined;
        carrier_code: string;
        carrier_title: string;
        method_code: string;
        method_title: string;
        amount: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        price_excl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        price_incl_tax: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
    } | null | undefined;
} | null)[]) => ShippingAddressModel[];
export { QuoteBillingAddress, QuoteShippingAddress, transformQuoteBillingAddress, transformQuoteShippingAddress, };
//# sourceMappingURL=transform-quote-address.d.ts.map