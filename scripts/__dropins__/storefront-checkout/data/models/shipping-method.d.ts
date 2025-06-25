import { Price } from './price';

type Carrier = {
    code: string;
    title: string;
};
export type ShippingMethod = {
    amount: Price;
    carrier: Carrier;
    code: string;
    title: string;
    value: string;
    amountExclTax?: Price;
    amountInclTax?: Price;
};
export {};
//# sourceMappingURL=shipping-method.d.ts.map