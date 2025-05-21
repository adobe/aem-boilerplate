import { PartialShippingAddress, ShippingEstimateShippingMethod, ShippingMethod } from '../models';

type TransformShippingEstimatePartialAddressInput = {
    country_id: string;
    postcode?: string;
    region_id?: number;
    region?: string;
};
export declare const transformShippingEstimatePartialAddress: (data: TransformShippingEstimatePartialAddressInput) => PartialShippingAddress;
export declare const transformShippingEstimateShippingMethod: (data: ShippingMethod) => ShippingEstimateShippingMethod;
export {};
//# sourceMappingURL=transform-shipping-estimate.d.ts.map