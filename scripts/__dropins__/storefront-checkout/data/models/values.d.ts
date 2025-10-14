import { PaymentMethod, ShippingMethod } from '.';

export interface ValuesModel {
    email: string;
    isBillToShipping: boolean | undefined;
    selectedPaymentMethod: PaymentMethod | null;
    selectedShippingMethod: ShippingMethod | null;
}
//# sourceMappingURL=values.d.ts.map