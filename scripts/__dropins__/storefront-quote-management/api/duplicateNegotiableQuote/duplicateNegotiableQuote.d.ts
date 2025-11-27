import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface DuplicateQuoteInput {
    quoteUid: string;
    duplicatedQuoteUid: string;
    hasOutOfStockItems?: boolean;
}
export declare const duplicateQuote: (input: DuplicateQuoteInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=duplicateNegotiableQuote.d.ts.map