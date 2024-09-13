export declare enum TaxDisplay {
    EXCLUDING_TAX = "EXCLUDING_TAX",
    INCLUDING_EXCLUDING_TAX = "INCLUDING_AND_EXCLUDING_TAX",
    INCLUDING_TAX = "INCLUDING_TAX"
}
export interface StoreConfig {
    defaultCountry: string;
    countriesWithRequiredRegion: string[];
    displayStateIfOptional: boolean;
    countriesWithOptionalZipCode: string[];
    isGuestCheckoutEnabled: boolean;
    isOnePageCheckoutEnabled: boolean;
    shoppingCartDisplaySetting: {
        shipping: TaxDisplay;
    };
}
//# sourceMappingURL=store-config.d.ts.map