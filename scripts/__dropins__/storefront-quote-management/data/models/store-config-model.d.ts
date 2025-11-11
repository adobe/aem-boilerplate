/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare enum QuoteDisplayAmount {
    TAX_INCLUDED = 1,
    TAX_EXCLUDED = 2,
    TAX_INCLUDED_AND_EXCLUDED = 3
}
export interface StoreConfigModel {
    quoteDisplaySettings: {
        zeroTax: boolean;
        subtotal: QuoteDisplayAmount;
        price: QuoteDisplayAmount;
        shipping: QuoteDisplayAmount;
        fullSummary: boolean;
        grandTotal: boolean;
    };
}
//# sourceMappingURL=store-config-model.d.ts.map