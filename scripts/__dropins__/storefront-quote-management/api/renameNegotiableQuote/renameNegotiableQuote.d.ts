import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface RenameNegotiableQuoteInput {
    quoteUid: string;
    quoteName: string;
    quoteComment?: string;
}
export declare const renameNegotiableQuote: (input: RenameNegotiableQuoteInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=renameNegotiableQuote.d.ts.map