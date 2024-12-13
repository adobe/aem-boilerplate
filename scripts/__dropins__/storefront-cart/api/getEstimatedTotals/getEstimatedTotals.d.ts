import { CartModel } from '../../data/models';

export interface EstimateAddressShippingInput {
    countryCode: string;
    postcode?: string;
    region?: {
        region?: string;
        id?: number;
    };
    shipping_method?: {
        carrier_code?: string;
        method_code?: string;
    };
}
export declare const getEstimatedTotals: (address: EstimateAddressShippingInput) => Promise<CartModel | null>;
//# sourceMappingURL=getEstimatedTotals.d.ts.map