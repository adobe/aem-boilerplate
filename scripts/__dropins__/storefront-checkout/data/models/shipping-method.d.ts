import { Price } from './price';

type Code = string;
type Title = string;
type Carrier = {
    code: Code;
    title: Title;
};
export type ShippingMethod = {
    amount: Price;
    carrier: Carrier;
    code: Code;
    title: Title;
    value: string;
    amountExclTax?: Price;
    amountInclTax?: Price;
};
export {};
//# sourceMappingURL=shipping-method.d.ts.map