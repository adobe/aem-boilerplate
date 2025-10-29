import { VNode } from 'preact';
import { RequisitionList as RequisitionListModel } from '../data/models/requisitionList';
import { RequisitionLists } from '../data/models/requisitionLists';

type Row = Record<string, VNode | string | number | undefined>;
type Callbacks = {
    handleOpenModal: (rl: RequisitionListModel) => void;
};
export declare function useRequisitionListGrid(initial?: RequisitionLists | null, callbacks?: Callbacks, routeRequisitionListDetails?: (uid: string) => string | void): {
    rows: Row[];
    expandedRows: Set<number>;
    isLoading: boolean;
    pageInfo: {
        page_size: number;
        current_page: number;
        total_pages: number;
    } | undefined;
    handlePageChange: (page?: number) => Promise<void>;
    handlePageSizeChange: (pageSize: number) => Promise<void>;
    isAdding: boolean;
    handleAddNew: () => void;
    handleCancelCreate: () => void;
};
export {};
//# sourceMappingURL=useRequisitionListGrid.d.ts.map