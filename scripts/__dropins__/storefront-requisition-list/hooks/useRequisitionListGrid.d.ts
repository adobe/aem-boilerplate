import { VNode } from 'preact';
import { RequisitionList as RequisitionListModel } from '../data/models/requisitionList';

type Row = Record<string, VNode | string | number | undefined>;
type Callbacks = {
    handleOpenRenameModal: (rl: RequisitionListModel) => void;
    handleOpenDeleteModal: (rl: RequisitionListModel) => void;
};
export declare function useRequisitionListGrid(callbacks?: Callbacks, routeRequisitionListDetails?: (uid: string) => string | void, closeModal?: () => void): {
    rows: Row[];
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