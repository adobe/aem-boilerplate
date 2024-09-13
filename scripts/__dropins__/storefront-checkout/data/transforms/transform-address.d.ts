import { GetCartQuery } from '../../__generated__/types';
import { ShippingAddress as ShippingAddressModel, BillingAddress as BillingAddressModel } from '../models/address';
import { CustomAttribute as CustomAttributeModel } from '../models';

type ShippingAddresses = NonNullable<GetCartQuery['cart']>['shipping_addresses'];
type ShippingAddress = ShippingAddresses[0];
type NonNullableShippingAddress = NonNullable<ShippingAddress>;
type BillingAddress = NonNullable<GetCartQuery['cart']>['billing_address'];
type NonNullableBillingAddress = NonNullable<BillingAddress>;
type CustomAttributes = NonNullableShippingAddress['custom_attributes'] | NonNullableBillingAddress['custom_attributes'];
export declare const transformCustomAttributes: (data: CustomAttributes) => CustomAttributeModel[];
declare const transformBillingAddress: (data: BillingAddress) => BillingAddressModel | undefined;
declare const transformShippingAddresses: (data: ({
    __typename?: "ShippingCartAddress" | undefined;
    firstname: string;
    lastname: string;
    company?: string | null | undefined;
    street: (string | null)[];
    city: string;
    postcode?: string | null | undefined;
    vat_id?: string | null | undefined;
    telephone?: string | null | undefined;
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
    selected_shipping_method?: {
        __typename?: "SelectedShippingMethod" | undefined;
        carrier_code: string;
        carrier_title: string;
        method_code: string;
        method_title: string;
        amount: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
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
} | null)[]) => ShippingAddressModel[] | undefined;
export { ShippingAddress, BillingAddress, transformBillingAddress, transformShippingAddresses, };
//# sourceMappingURL=transform-address.d.ts.map