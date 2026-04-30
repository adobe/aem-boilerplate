import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel } from '../data/models';

export interface OrderCommentItem {
    message: string;
    timestamp: string;
}
export interface OrderCommentsComponentProps extends HTMLAttributes<HTMLDivElement> {
    /** Order-level comments from CustomerOrder.comments */
    comments?: OrderCommentItem[];
}
export interface OrderCommentsProps {
    className?: string;
    orderData?: OrderDataModel;
}
export interface UseOrderCommentsProps {
    orderData?: OrderDataModel;
}
//# sourceMappingURL=orderComments.types.d.ts.map