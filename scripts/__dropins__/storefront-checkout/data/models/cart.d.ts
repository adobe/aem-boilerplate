import { Address, PaymentMethod, ShippingAddress } from '.';

export interface CartAddress extends Address {
}
export type CartShippingAddress = CartAddress & ShippingAddress & {
    sameAsBilling?: boolean;
};
export interface Cart {
    type: 'cart';
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: CartAddress;
    email?: string;
    id: string;
    isEmpty: boolean;
    isGuest: boolean;
    isVirtual: boolean;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses: CartShippingAddress[];
}
//# sourceMappingURL=cart.d.ts.map