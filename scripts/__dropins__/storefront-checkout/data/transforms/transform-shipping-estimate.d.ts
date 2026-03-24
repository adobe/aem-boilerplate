import { PartialShippingAddress, ShippingEstimateShippingMethod, ShippingMethod } from '../models';
import { EstimateShippingMethodsMutation } from '../../__generated__/types';

type AvailableShippingMethods = EstimateShippingMethodsMutation['estimateShippingMethods'];
type TransformShippingEstimatePartialAddressInput = {
    country_id: string;
    postcode?: string;
    region_id?: number;
    region?: string;
};
export declare const transformShippingEstimatePartialAddress: (data: TransformShippingEstimatePartialAddressInput) => PartialShippingAddress;
export declare const transformShippingEstimateShippingMethod: (data: ShippingMethod) => ShippingEstimateShippingMethod;
export declare const transformEstimateShippingMethods: (data: AvailableShippingMethods) => ShippingMethod[];
export {};
//# sourceMappingURL=transform-shipping-estimate.d.ts.map