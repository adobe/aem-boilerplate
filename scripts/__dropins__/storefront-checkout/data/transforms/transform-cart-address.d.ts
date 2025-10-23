import { AddressInput as AddressInputModel, CartAddress as CartAddressModel, CartShippingAddress as CartShippingAddressModel } from '../models';
import { GetCartQuery } from '../../__generated__/types';

type ShippingAddresses = NonNullable<GetCartQuery['cart']>['shipping_addresses'];
type CartShippingAddress = ShippingAddresses[0];
type CartBillingAddress = NonNullable<GetCartQuery['cart']>['billing_address'];
declare const transformCartBillingAddress: (data: CartBillingAddress) => CartAddressModel | undefined;
declare const transformCartShippingAddress: (data: ({
    __typename?: "ShippingCartAddress" | undefined;
    city: string;
    company?: string | null | undefined;
    fax?: string | null | undefined;
    firstname: string;
    id?: number | null | undefined;
    lastname: string;
    middlename?: string | null | undefined;
    postcode?: string | null | undefined;
    prefix?: string | null | undefined;
    same_as_billing: boolean;
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
    region?: {
        __typename?: "CartAddressRegion" | undefined;
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
} | null)[]) => CartShippingAddressModel[];
declare const transformAddressToCartAddressInput: <T extends CartAddressModel>(address?: T | null | undefined) => AddressInputModel | undefined;
export { CartBillingAddress, CartShippingAddress, transformAddressToCartAddressInput, transformCartBillingAddress, transformCartShippingAddress, };
//# sourceMappingURL=transform-cart-address.d.ts.map