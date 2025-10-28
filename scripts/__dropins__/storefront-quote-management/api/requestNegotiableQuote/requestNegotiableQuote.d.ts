import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface RequestNegotiableQuoteInput {
    cartId: string;
    quoteName: string;
    comment: string;
    isDraft?: boolean;
    attachments?: {
        key: string;
    }[];
}
export declare const requestNegotiableQuote: (input: RequestNegotiableQuoteInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=requestNegotiableQuote.d.ts.map