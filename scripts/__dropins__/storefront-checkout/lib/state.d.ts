import { StoreConfig } from '../data/models';

type State = {
    authenticated: boolean;
    cartId?: string | null;
    config: StoreConfig | null;
    initialized: boolean;
    quoteId?: string | null;
};
export declare const state: State;
export declare function isQuoteCheckout(): boolean;
export declare function isCartCheckout(): boolean;
export {};
//# sourceMappingURL=state.d.ts.map