import { Price } from './price';

export interface ShippingEstimatePartialAddress {
    countryCode: string;
    postCode?: string;
    region?: string;
    regionCode?: string;
    regionId?: number;
}
export interface ShippingEstimateShippingMethod {
    amount: Price;
    carrierCode: string;
    methodCode: string;
    amountExclTax?: Price;
    amountInclTax?: Price;
}
//# sourceMappingURL=shipping-estimate.d.ts.map