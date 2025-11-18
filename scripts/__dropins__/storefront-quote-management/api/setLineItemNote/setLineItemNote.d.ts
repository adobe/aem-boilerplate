import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface SetLineItemNoteInput {
    quoteUid: string;
    itemUid: string;
    note: string;
    quantity?: number;
}
export declare const setLineItemNote: (input: SetLineItemNoteInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=setLineItemNote.d.ts.map