/********************************************************************
* ADOBE CONFIDENTIAL
* __________________
*
*  Copyright 2024 Adobe
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
*******************************************************************/
export declare enum TaxDisplay {
    EXCLUDING_TAX = "EXCLUDING_TAX",
    INCLUDING_EXCLUDING_TAX = "INCLUDING_AND_EXCLUDING_TAX",
    INCLUDING_TAX = "INCLUDING_TAX"
}
export interface StoreConfig {
    defaultCountry: string;
    isGuestCheckoutEnabled: boolean;
    isOnePageCheckoutEnabled: boolean;
    shoppingCartDisplaySetting: {
        shipping: TaxDisplay;
    };
}
//# sourceMappingURL=store-config.d.ts.map