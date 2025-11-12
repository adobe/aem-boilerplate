/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface RemoveQuoteTemplateItemsParams {
    templateId: string;
    itemUids: string[];
}
export declare const removeQuoteTemplateItems: (params: RemoveQuoteTemplateItemsParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=removeQuoteTemplateItems.d.ts.map