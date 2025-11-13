import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ManageNegotiableQuoteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    loading?: boolean;
    quoteName: VNode;
    quoteStatus: VNode;
    banner?: VNode;
    details?: VNode;
    actionBar?: VNode;
    quoteContent: VNode;
    shippingInformationTitle: VNode;
    shippingInformation: VNode;
    quoteCommentsTitle: VNode;
    quoteComments: VNode;
    footer: VNode;
}
export declare const ManageNegotiableQuote: FunctionComponent<ManageNegotiableQuoteProps>;
export declare const ManageNegotiableQuoteSkeleton: FunctionComponent;
//# sourceMappingURL=ManageNegotiableQuote.d.ts.map