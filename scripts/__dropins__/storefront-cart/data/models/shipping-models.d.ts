import { Price } from './cart-model';

export interface PartialAddress {
    countryCode: string;
    postCode?: string;
    region?: string;
    regionCode?: string;
    regionId?: number;
}
export interface ShippingMethod {
    carrierCode: string;
    methodCode: string;
    amountExclTax?: Price;
    amountInclTax?: Price;
}
//# sourceMappingURL=shipping-models.d.ts.map