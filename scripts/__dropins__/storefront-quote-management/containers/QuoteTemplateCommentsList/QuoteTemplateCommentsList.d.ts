import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';

export interface QuoteTemplateCommentsListProps extends HTMLAttributes<HTMLUListElement> {
    templateData?: NegotiableQuoteTemplateModel;
}
export declare const QuoteTemplateCommentsList: Container<QuoteTemplateCommentsListProps>;
//# sourceMappingURL=QuoteTemplateCommentsList.d.ts.map