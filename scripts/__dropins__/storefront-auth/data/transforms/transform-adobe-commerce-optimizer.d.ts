import { AdobeCommerceOptimizerModel } from '../models';

export interface AdobeCommerceOptimizerData {
    priceBookId: string;
}
export interface AdobeCommerceOptimizerResponse {
    data?: {
        commerceOptimizer?: AdobeCommerceOptimizerData;
    };
}
export declare const transformAdobeCommerceOptimizerData: (response: AdobeCommerceOptimizerResponse) => AdobeCommerceOptimizerModel;
//# sourceMappingURL=transform-adobe-commerce-optimizer.d.ts.map