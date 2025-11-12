/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface NegotiableQuoteTemplateItemQuantityInput {
    itemId: string;
    quantity: number;
    minQty?: number;
    maxQty?: number;
}
export interface UpdateQuoteTemplateItemQuantitiesParams {
    templateId: string;
    items: NegotiableQuoteTemplateItemQuantityInput[];
}
export declare const updateQuoteTemplateItemQuantities: (params: UpdateQuoteTemplateItemQuantitiesParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=updateQuoteTemplateItemQuantities.d.ts.map