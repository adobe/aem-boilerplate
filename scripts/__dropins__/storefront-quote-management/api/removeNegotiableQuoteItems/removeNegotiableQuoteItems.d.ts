import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface RemoveNegotiableQuoteItemsInput {
    quoteUid: string;
    quoteItemUids: string[];
}
export declare const removeNegotiableQuoteItems: (input: RemoveNegotiableQuoteItemsInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=removeNegotiableQuoteItems.d.ts.map