import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface QuoteHistoryLogProps extends HTMLAttributes<HTMLDivElement> {
    quoteData?: NegotiableQuoteModel;
}
export declare const QuoteHistoryLog: Container<QuoteHistoryLogProps>;
//# sourceMappingURL=QuoteHistoryLog.d.ts.map