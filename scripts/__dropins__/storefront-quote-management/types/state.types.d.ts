import { StoreConfigModel } from '../data/models';

export type State = {
    authenticated: boolean;
    permissions: {
        requestQuote: boolean;
        editQuote: boolean;
        deleteQuote: boolean;
        checkoutQuote: boolean;
    };
    config: StoreConfigModel;
};
//# sourceMappingURL=state.types.d.ts.map