import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ReferenceDocument {
    uid?: string;
    name: string;
    identifier?: string;
    url: string;
}
export interface ReferenceDocumentsListProps extends HTMLAttributes<HTMLDivElement> {
    documents: ReferenceDocument[];
    isEditable?: boolean;
    onAdd?: () => void;
    onEdit?: (document: ReferenceDocument) => void;
    onRemove?: (document: ReferenceDocument) => void;
}
export declare const ReferenceDocumentsList: FunctionComponent<ReferenceDocumentsListProps>;
//# sourceMappingURL=ReferenceDocumentsList.d.ts.map