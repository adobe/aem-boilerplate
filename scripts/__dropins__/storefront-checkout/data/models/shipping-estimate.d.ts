import { Price, ShippingMethod } from '.';

export interface PartialShippingAddress {
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
export interface ShippingEstimate {
    address: PartialShippingAddress;
    availableShippingMethods?: ShippingMethod[];
    shippingMethod: ShippingEstimateShippingMethod | null;
    success?: boolean;
}
//# sourceMappingURL=shipping-estimate.d.ts.map