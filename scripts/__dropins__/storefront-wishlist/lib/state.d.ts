import { StoreConfigModel } from '../data/models/store-config';

type State = {
    wishlistId: string | null;
    initializing?: boolean;
    isLoading?: boolean;
    locale?: string;
    config?: StoreConfigModel | null;
    authenticated: boolean;
    storeCode?: string;
};
export declare const state: State;
export {};
//# sourceMappingURL=state.d.ts.map