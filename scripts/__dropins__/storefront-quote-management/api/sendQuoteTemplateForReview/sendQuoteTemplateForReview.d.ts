/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface ReferenceDocumentLinkInput {
    uid?: string;
    name: string;
    identifier?: string;
    url: string;
}
export interface SendQuoteTemplateForReviewParams {
    templateId: string;
    name?: string;
    comment?: string;
    referenceDocumentLinks?: ReferenceDocumentLinkInput[];
}
export declare const sendQuoteTemplateForReview: (params: SendQuoteTemplateForReviewParams) => Promise<import('../../data/models/negotiable-quote-template-model').NegotiableQuoteTemplateModel>;
//# sourceMappingURL=sendQuoteTemplateForReview.d.ts.map