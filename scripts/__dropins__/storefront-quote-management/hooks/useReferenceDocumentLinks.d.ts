import { ReferenceDocument } from '../components';
import { ReferenceDocumentLinkInput } from '../api/sendQuoteTemplateForReview/sendQuoteTemplateForReview';

export interface UseReferenceDocumentLinksParams {
    templateReferenceDocuments?: ReferenceDocument[];
    localReferenceDocuments: ReferenceDocument[];
}
export interface UseReferenceDocumentLinksReturn {
    /**
     * Checks if a document exists in the template reference documents.
     * Matches by uid if both documents have it, otherwise matches by url.
     */
    isDocumentInTemplateData: (document: ReferenceDocument) => boolean;
    /**
     * Returns documents from localReferenceDocuments that are not in templateReferenceDocuments.
     */
    getNewDocuments: () => ReferenceDocument[];
    /**
     * Transforms all reference documents to API format.
     */
    getReferenceDocumentLinks: () => ReferenceDocumentLinkInput[];
    /**
     * Indicates if there are unsaved changes (new documents, removed documents, or modified documents).
     */
    hasUnsavedChanges: boolean;
}
/**
 * Custom hook to manage reference document links logic.
 * Handles document matching, filtering new documents, transformation to API format,
 * and detection of unsaved changes (new, removed, or modified documents).
 * Note: getReferenceDocumentLinks() returns all local reference documents, not just new ones.
 */
export declare const useReferenceDocumentLinks: (params: UseReferenceDocumentLinksParams) => UseReferenceDocumentLinksReturn;
//# sourceMappingURL=useReferenceDocumentLinks.d.ts.map