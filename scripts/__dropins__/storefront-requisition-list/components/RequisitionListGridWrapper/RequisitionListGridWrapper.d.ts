import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';

export interface RequisitionListGridWrapperProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    isLoading?: boolean;
    header?: VNode;
    rows: Array<Record<string, VNode | string | number | undefined>>;
    skeletonRowCount: number;
    pageInfo?: {
        total_pages: number;
        current_page: number;
        page_size: number;
    };
    handlePageChange: (page?: number) => Promise<void>;
    handlePageSizeChange?: (pageSize: number) => Promise<void>;
    defaultPageSize?: number;
    isAdding: boolean;
    handleAddNew: () => void;
    handleCancelCreate: () => void;
}
export declare const RequisitionListGridWrapper: FunctionComponent<RequisitionListGridWrapperProps>;
//# sourceMappingURL=RequisitionListGridWrapper.d.ts.map