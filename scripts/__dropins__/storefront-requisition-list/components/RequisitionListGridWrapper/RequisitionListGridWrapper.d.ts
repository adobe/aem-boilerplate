import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';

export interface RequisitionListGridWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    isLoading?: boolean;
    addReqList?: boolean;
    header?: VNode;
    rows: Array<Record<string, VNode | string | number | undefined>>;
    expandedRows: Set<number>;
    skeletonRowCount: number;
    pageInfo?: {
        total_pages: number;
        current_page: number;
    };
    handlePageChange: (page?: number) => Promise<void>;
}
export declare const RequisitionListGridWrapper: FunctionComponent<RequisitionListGridWrapperProps>;
//# sourceMappingURL=RequisitionListGridWrapper.d.ts.map