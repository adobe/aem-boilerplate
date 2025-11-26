import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ManageNegotiableQuoteTemplateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    loading?: boolean;
    templateName: VNode;
    templateId: VNode;
    banner?: VNode;
    details?: VNode;
    actionBar?: VNode;
    referenceDocuments?: VNode;
    itemsTable: VNode;
    commentsTitle: VNode;
    comments: VNode;
    footer?: VNode;
}
export declare const ManageNegotiableQuoteTemplate: FunctionComponent<ManageNegotiableQuoteTemplateProps>;
export declare const ManageNegotiableQuoteTemplateSkeleton: FunctionComponent;
//# sourceMappingURL=ManageNegotiableQuoteTemplate.d.ts.map