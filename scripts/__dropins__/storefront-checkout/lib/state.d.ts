import { StoreConfig } from '../data/models';

type State = {
    authenticated: boolean;
    cartId: string | null;
    initialized: boolean;
    config: StoreConfig | null;
};
export declare const state: State;
export declare const getStoreConfigCache: () => StoreConfig | null;
export {};
//# sourceMappingURL=state.d.ts.map