import { StoreConfigModel } from '../data/models/store-config';

type State = {
    wishlistId: string | null;
    initializing?: boolean;
    locale?: string;
    config?: StoreConfigModel | null;
    authenticated: boolean;
    currentPage?: number;
    pageSize?: number;
};
export declare const state: State;
export {};
//# sourceMappingURL=state.d.ts.map