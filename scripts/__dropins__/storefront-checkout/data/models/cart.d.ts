import { Address, PaymentMethod, ShippingMethod } from '.';

export interface ShippingAddress extends Address {
    availableShippingMethods?: ShippingMethod[];
    selectedShippingMethod?: ShippingMethod;
    sameAsBilling?: boolean;
}
export interface Cart {
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: Address;
    email?: string;
    id: string;
    isEmpty: boolean;
    isGuest: boolean;
    isVirtual: boolean;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses?: ShippingAddress[];
}
//# sourceMappingURL=cart.d.ts.map