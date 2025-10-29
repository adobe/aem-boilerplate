import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface QuoteHistoryLogProps extends HTMLAttributes<HTMLDivElement> {
    quoteData?: NegotiableQuoteModel;
}
export declare const QuoteHistoryLog: FunctionComponent<QuoteHistoryLogProps>;
//# sourceMappingURL=QuoteHistoryLog.d.ts.map