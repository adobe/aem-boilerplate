import { StoreConfigModel } from '../data/models';

export type State = {
    authenticated: boolean;
    permissions: {
        requestQuote: boolean;
        editQuote: boolean;
        deleteQuote: boolean;
        checkoutQuote: boolean;
        /** Permission to view quote templates */
        viewQuoteTemplates: boolean;
        /** Permission to manage (create, edit, delete) quote templates */
        manageQuoteTemplates: boolean;
        /** Permission to generate quotes from templates */
        generateQuoteFromTemplate: boolean;
    };
    config: StoreConfigModel;
    initialized: boolean;
    quoteDataLoaded: boolean;
};
//# sourceMappingURL=state.types.d.ts.map