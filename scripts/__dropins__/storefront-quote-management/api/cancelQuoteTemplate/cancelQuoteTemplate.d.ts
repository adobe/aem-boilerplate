/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface CancelQuoteTemplateParams {
    templateId: string;
    comment?: string;
}
export declare const cancelQuoteTemplate: (params: CancelQuoteTemplateParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=cancelQuoteTemplate.d.ts.map