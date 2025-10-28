import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface QuoteCommentsListProps extends HTMLAttributes<HTMLUListElement> {
    quoteData?: NegotiableQuoteModel;
}
export declare const QuoteCommentsList: Container<QuoteCommentsListProps>;
//# sourceMappingURL=QuoteCommentsList.d.ts.map