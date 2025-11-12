import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface RequisitionListViewProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The UID of the requisition list to display.
     * The UID must be a base64-encoded string.
     * If an invalid UID is provided, the component will render the NotFound state.
     * The component will fetch the requisition list data internally.
     */
    requisitionListUid: string;
    /**
     * When true, skips automatic product data fetching on component mount.
     * Used in tests to prevent API calls.
     */
    skipProductLoading?: boolean;
    /**
     * Number of items per page for pagination.
     * Defaults to DEFAULT_PAGE_SIZE.
     */
    pageSize?: number;
    selectedItems: Set<string>;
    /**
     * Function that returns the URL to the requisition list grid view or performs navigation
     */
    routeRequisitionListGrid?: () => string | void;
}
export declare const RequisitionListView: Container<RequisitionListViewProps>;
//# sourceMappingURL=RequisitionListView.d.ts.map