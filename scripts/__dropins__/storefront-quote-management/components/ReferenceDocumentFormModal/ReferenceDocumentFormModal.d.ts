import { FunctionComponent, HTMLAttributes } from 'preact/compat';
import { VNode } from 'preact';

export interface ReferenceDocument {
    uid?: string;
    name: string;
    identifier?: string;
    url: string;
}
export interface ReferenceDocumentFormModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    document?: ReferenceDocument;
    /**
     * Optional error message string. If provided, automatically creates an InLineAlert error banner.
     * If both errorMessage and errorBanner are provided, errorBanner takes precedence.
     */
    errorMessage?: string;
    /**
     * Optional custom error banner VNode. Provides full control over error banner rendering.
     * If both errorMessage and errorBanner are provided, errorBanner takes precedence.
     */
    errorBanner?: VNode;
    successBanner?: VNode;
    showCloseButton?: boolean;
    isSubmitting?: boolean;
    onSave: (document: ReferenceDocument) => void;
    onClose?: () => void;
}
export declare const ReferenceDocumentFormModal: FunctionComponent<ReferenceDocumentFormModalProps>;
//# sourceMappingURL=ReferenceDocumentFormModal.d.ts.map