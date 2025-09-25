import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface RequestNegotiableQuoteFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'title'> {
    title: VNode;
    banner?: VNode;
    commentField?: VNode;
    quoteNameField?: VNode;
    attachFile?: VNode;
    requestButton?: VNode;
    saveButton?: VNode;
    onSubmit: (e: Event) => void;
}
export declare const RequestNegotiableQuoteForm: FunctionComponent<RequestNegotiableQuoteFormProps>;
//# sourceMappingURL=RequestNegotiableQuoteForm.d.ts.map