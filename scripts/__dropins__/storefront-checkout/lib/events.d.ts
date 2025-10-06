import { Cart, NegotiableQuote } from '../data/models';

type DataModel = Cart | NegotiableQuote;
export declare function getInitialCheckoutData(): DataModel | null;
export declare function getLatestCheckoutUpdate(): DataModel | null;
export declare function getCheckoutData(): DataModel | null;
export declare function hasShippingAddress(): boolean;
export declare function getCartEmail(): string | null;
export {};
//# sourceMappingURL=events.d.ts.map