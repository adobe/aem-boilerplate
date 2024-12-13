import { CartModel } from '../../data/models';

export interface ApplyCouponsToCartInput {
    type: ApplyCouponsStrategy;
}
export declare enum ApplyCouponsStrategy {
    APPEND = "APPEND",
    REPLACE = "REPLACE"
}
export declare const applyCouponsToCart: (couponCodes: string[], type: ApplyCouponsStrategy) => Promise<CartModel | null>;
//# sourceMappingURL=applyCouponsToCart.d.ts.map