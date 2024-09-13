import { AddressInput } from '../setShippingAddress';

export interface BillingAddressInput {
    address?: AddressInput;
    customer_address_id?: number;
    same_as_shipping?: boolean;
    use_for_shipping?: boolean;
}
export declare const setBillingAddress: ({ signal, input, }: {
    signal?: AbortSignal | undefined;
    input: BillingAddressInput;
}) => Promise<import('../../data/models/cart').Cart | null | undefined>;
//# sourceMappingURL=setBillingAddress.d.ts.map