import { RequisitionListActionPayload } from 'adobe-commerce/event-bus';
import { RequisitionList } from '../data/models/requisitionList';

export interface UseRequisitionListTransferOptions {
    sourceListUid: string;
    selectedItems: Set<string>;
    currentPageSize: number;
    currentPage: number;
    enrichConfigurableProductsInList: (list: RequisitionList) => Promise<RequisitionList>;
    fetchAndMergeProducts: (list: RequisitionList) => Promise<RequisitionList>;
    setCurrentRequisitionList: (list: RequisitionList) => void;
    setSelectedItems: (items: Set<string>) => void;
    handleRequisitionListAlert: (payload: RequisitionListActionPayload) => void;
}
export declare function useRequisitionListTransfer({ sourceListUid, selectedItems, currentPageSize, currentPage, enrichConfigurableProductsInList, fetchAndMergeProducts, setCurrentRequisitionList, setSelectedItems, handleRequisitionListAlert, }: UseRequisitionListTransferOptions): {
    showMoveToListModal: boolean;
    setShowMoveToListModal: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    movingToList: boolean;
    showCopyToListModal: boolean;
    setShowCopyToListModal: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    copyingToList: boolean;
    handleMoveToList: (destinationListUid: string) => Promise<void>;
    handleCopyToList: (destinationListUid: string) => Promise<void>;
};
//# sourceMappingURL=useRequisitionListTransfer.d.ts.map