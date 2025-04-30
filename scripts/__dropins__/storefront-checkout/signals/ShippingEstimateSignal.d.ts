import { ShippingEstimatePartialAddress, ShippingMethod } from '../data/models';

export type ShippingEstimation = {
    address: ShippingEstimatePartialAddress;
    options: ShippingMethod[] | undefined;
};
export declare const shippingEstimateSignal: import('@preact/signals-core').Signal<ShippingEstimation | undefined>;
//# sourceMappingURL=ShippingEstimateSignal.d.ts.map