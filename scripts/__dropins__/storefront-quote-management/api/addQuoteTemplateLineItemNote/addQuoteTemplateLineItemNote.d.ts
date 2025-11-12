/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface AddQuoteTemplateLineItemNoteParams {
    templateId: string;
    itemId: string;
    note?: string;
}
export declare const addQuoteTemplateLineItemNote: (params: AddQuoteTemplateLineItemNoteParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=addQuoteTemplateLineItemNote.d.ts.map