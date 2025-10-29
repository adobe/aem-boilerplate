import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface QuoteCommentsListProps extends HTMLAttributes<HTMLUListElement> {
    comments: Array<{
        uid: string;
        createdAt: VNode;
        author: VNode;
        text: VNode;
    }>;
}
export declare const QuoteCommentsList: FunctionComponent<QuoteCommentsListProps>;
//# sourceMappingURL=QuoteCommentsList.d.ts.map