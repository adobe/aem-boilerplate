import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface SendForReviewInput {
    quoteUid: string;
    comment?: string;
}
export declare const sendForReview: (input: SendForReviewInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=sendForReview.d.ts.map