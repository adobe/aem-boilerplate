import { PaymentMethod } from './payment-method';
import { ShippingAddress, BillingAddress } from './address';

export type Cart = {
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: BillingAddress;
    email?: string;
    id: string;
    isEmpty: boolean;
    isVirtual: boolean;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses?: ShippingAddress[];
};
//# sourceMappingURL=cart.d.ts.map