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
export interface StoreConfigModel {
    displayMiniCart: boolean;
    miniCartMaxItemsDisplay: number;
    cartExpiresInDays: number;
    cartSummaryDisplayTotal: number;
    defaultCountry: string;
    categoryFixedProductTaxDisplaySetting: string;
    productFixedProductTaxDisplaySetting: string;
    salesFixedProductTaxDisplaySetting: string;
    shoppingCartDisplaySetting: {
        fullSummary: boolean;
        grandTotal: boolean;
        price: number | string;
        shipping: number | string;
        subtotal: number | string;
        taxGiftWrapping: number | string;
        zeroTax: boolean;
    };
    useConfigurableParentThumbnail: boolean;
}
//# sourceMappingURL=store-models.d.ts.map