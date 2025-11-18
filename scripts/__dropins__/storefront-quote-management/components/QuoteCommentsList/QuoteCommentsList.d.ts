import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface QuoteCommentsListProps extends HTMLAttributes<HTMLUListElement> {
    comments: Array<{
        uid: string;
        createdAt: VNode;
        author: VNode;
        text: VNode;
        attachments?: Array<{
            name: string;
            url: string;
        }>;
    }>;
}
export declare const QuoteCommentsList: FunctionComponent<QuoteCommentsListProps>;
//# sourceMappingURL=QuoteCommentsList.d.ts.map