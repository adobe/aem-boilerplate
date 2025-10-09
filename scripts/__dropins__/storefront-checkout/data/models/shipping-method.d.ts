import { Money } from './money';

type Carrier = {
    code: string;
    title: string;
};
export type ShippingMethod = {
    amount: Money;
    carrier: Carrier;
    code: string;
    title: string;
    value: string;
    amountExclTax?: Money;
    amountInclTax?: Money;
};
export {};
//# sourceMappingURL=shipping-method.d.ts.map