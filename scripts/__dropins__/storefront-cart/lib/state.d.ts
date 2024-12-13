import { StoreConfigModel } from '../data/models/store-models';

type State = {
    state: {
        displayMiniCart: boolean;
        miniCartMaxItemsDisplay: number;
        cartExpiresInDays: number;
        cartSummaryDisplayTotal: number;
        defaultCountry: string;
        categoryFixedProductTaxDisplaySetting: string;
        productFixedProductTaxDisplaySetting: string;
        salesFixedProductTaxDisplaySetting: string;
        useConfigurableParentThumbnail: boolean;
        shoppingCartDisplaySetting: {
            zeroTax: boolean;
            subtotal: string;
            price: string;
            shipping: string;
            fullSummary: boolean;
            grandTotal: boolean;
            taxGiftWrapping: string;
        };
    };
    cartId: string | null;
    authenticated: boolean;
    initializing?: boolean;
    locale?: string;
    config?: StoreConfigModel | null;
};
export declare const state: State;
export {};
//# sourceMappingURL=state.d.ts.map