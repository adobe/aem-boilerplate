import { StoreConfigModel } from '../data/models/store-models';

type State = {
    cartId: string | null;
    authenticated: boolean;
    initializing?: boolean;
    locale?: string;
    config?: StoreConfigModel | null;
};
export declare const state: State;
export {};
//# sourceMappingURL=state.d.ts.map