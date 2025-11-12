/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare enum QuoteDisplayAmount {
    TAX_EXCLUDED = 1,
    TAX_INCLUDED = 2,
    TAX_INCLUDED_AND_EXCLUDED = 3
}
export interface StoreConfigModel {
    quoteSummaryDisplayTotal: number;
    quoteSummaryMaxItems: number;
    quoteDisplaySettings: {
        zeroTax: boolean;
        subtotal: QuoteDisplayAmount;
        price: QuoteDisplayAmount;
        shipping: QuoteDisplayAmount;
        fullSummary: boolean;
        grandTotal: boolean;
    };
    useConfigurableParentThumbnail: boolean;
}
//# sourceMappingURL=store-config-model.d.ts.map