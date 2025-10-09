import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList } from '../../data/models/requisitionList';

export interface RequisitionListViewProps extends HTMLAttributes<HTMLDivElement> {
    requisitionList: RequisitionList;
    routeRequisitionListGrid?: () => string | void;
    /**
     * When true, skips automatic product data fetching on component mount.
     * Used in tests to prevent API calls.
     */
    skipProductLoading?: boolean;
    /**
     * Number of items per page for pagination.
     * Defaults to 10.
     */
    pageSize?: number;
}
export declare const RequisitionListView: Container<RequisitionListViewProps>;
//# sourceMappingURL=RequisitionListView.d.ts.map